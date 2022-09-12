import { Component, OnInit } from '@angular/core';
import { getDatabase, push, get, child, set, ref, query, equalTo, orderByChild, onValue, update, remove} from "firebase/database";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor() { }

  userType:any;
  username:any='';
  message:any;
  sendTo:any;
  isChatOpen=false;

  chat:any=[
    {
      senderName:'',
      to:'Hari',
      messages:[
        {
          mess:'',
          from:'',
          time:''
        },
      ]
    }    
  ]
 

  currentChat:any=[{} ]

  ngOnInit(): void {
    this.username=localStorage.getItem('token')
    this.loadMessages()
  }


  loadMessages(username?:any){
    this.username = localStorage.getItem('token');
    let userType = localStorage.getItem('userType');
    this.userType=userType

      this.chat=[];
  
      const db = getDatabase();
      const tip = ref(db, 'chat/' + this.username);
      onValue(tip, (snapshot) => {
  
        if(!snapshot.val()){
          if(userType=='instructor'){
            this.chat = []
          }
          return
        } 
        // console.log([snapshot.val()])
        if(snapshot.val()){
          this.chat = snapshot.val().senderName
        }     
      })
    
  }

  loadChat(username:any){
      this.currentChat=[];
  
      const db = getDatabase();
      const tip = ref(db, 'chat/' + username);
      onValue(tip, (snapshot) => {
        // console.log([snapshot.val()])
        if(snapshot.val()){
          this.currentChat = snapshot.val().senderName
          console.log(this.currentChat);
          this.isChatOpen=true
        }     
      })
      this.sendTo=username;
  }

 

  sendMessage(){
    const db = getDatabase();
    let userType = localStorage.getItem('userType');
    let time = new Date();
    let currentTime = time.toLocaleTimeString();
  
    this.currentChat[0].messages.push({
      mess:this.message,
      from:this.username,
      time:currentTime
    })

    const dbRef = ref(db)

    get(child(dbRef,'chat/' + 'Hari'))
    .then((snapshot)=>{
      //mess length
      let messLength = snapshot.val().senderName.length
      console.log(messLength);
      let entireMessList=snapshot.val().senderName

        for(let i=0; i<messLength;i++){
          if(snapshot.val().senderName[i].senderName==this.sendTo){
            //get the full messages of hati and then push the new one
              let mess = snapshot.val().senderName[i].messages
              mess=this.currentChat[0].messages
              // push to entire mess list and then set entire mess
              entireMessList[i].messages = mess

              set(ref(db, 'chat/' + 'Hari'), {
                senderName:entireMessList 
              });

              return
          }
        }  

     
    }) 

      
      set(ref(db, 'chat/' + this.sendTo), {
        senderName:this.currentChat 
      });
    
      this.message='';

  }
  

}

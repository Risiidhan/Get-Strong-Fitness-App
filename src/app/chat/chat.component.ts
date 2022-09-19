import { Component, OnInit } from '@angular/core';
import { getDatabase, push, get, child, set, ref, query, equalTo, orderByChild, onValue, update, remove} from "firebase/database";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor() { }

  userType:any;
  username:any='';
  message:any;
  sendTo:any;
  newChatOfHari:any

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
 
  

  currentChat:any=[{
    senderName:this.username,
    to:'Hari',
    messages:[
    ]
  } ]

  ngOnInit(): void {
      this.getUserDetails()
    this.loadMessages()
    // this.loadChatOf('hari')
  }


  

  getUserDetails(){
    this.username=localStorage.getItem('token')
    this.currentChat[0].senderName=this.username
  }


  loadMessages(){
    this.username = localStorage.getItem('token');
    let userType = localStorage.getItem('userType');
    this.userType=userType
    this.chat=[];

    const db = getDatabase();
    const tip = ref(db, 'chat/' + this.username);
    onValue(tip, (snapshot) => {

      if(!snapshot.val()){
        if(userType=='trainee'){
          this.chat = [
            {
              senderName:this.username,
              to:'Hari',
              messages:[]
            },
          ],
          this.sendTo='Hari'
        }
        return
      } 
     
      // console.log([snapshot.val()])
      if(snapshot.val()){
        this.currentChat=snapshot.val().senderName
        this.chat = snapshot.val().senderName
        this.sendTo=this.username
      }     
    })
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

      set(ref(db, 'chat/' + this.username), {
        senderName:this.currentChat       
      });


    // should happen if this user is not present in hari chat
      let mess=[{}];
      let userMessIsNotThere=false;
      
      //get hari messages
      get(child(dbRef,'chat/' + 'Hari'))
      .then((snapshot)=>{
        //mess length
        let messLength = snapshot.val().senderName.length
        console.log(messLength);
        let entireMessList=snapshot.val().senderName

          for(let i=0; i<messLength;i++){
            if(snapshot.val().senderName[i].senderName==this.username){
              //get the full messages of hati and then push the new one
                mess = snapshot.val().senderName[i].messages
                mess=this.currentChat[0].messages
                // push to entire mess list and then set entire mess
                entireMessList[i].messages = mess

                set(ref(db, 'chat/' + 'Hari'), {
                  senderName:entireMessList 
                });

                return
            }
          }
  
          if(!userMessIsNotThere){

            mess = snapshot.val().senderName
            mess.push(this.currentChat[0])
            this.newChatOfHari=mess
      
            set(ref(db, 'chat/' + 'Hari'), {
              senderName:this.newChatOfHari 
            });
            
          }
        
          this.message='';

       
      })   


  }
  

}

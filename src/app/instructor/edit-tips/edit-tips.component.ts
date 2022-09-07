import { Component, OnInit } from '@angular/core';
import { getDatabase, child, get, set, ref, onValue, update, remove} from "firebase/database"
import { MessageService } from 'src/app/services/message.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';


@Component({
  selector: 'app-edit-tips',
  templateUrl: './edit-tips.component.html',
  styleUrls: ['./edit-tips.component.css']
})
export class EditTipsComponent implements OnInit {

  constructor( 
    private messService:MessageService,
    private errorMessService:ErrorMessageService ) { }
  
  data:any = [{}];
  tips:any = [];

  ngOnInit(): void {
    this.getAllTips()
  }

  updateTip(form:any){
    const db = getDatabase();
    update(ref(db, 'tip/' + form.title), {
      title: form.title,
      description : form.description,
    });
    this.getAllTips()
    this.messService.messageBox('Updated');

  }

  addTip(form:any){
    const db = getDatabase();

    //check if tip already exists
    const dbRef = ref(db)
    get(child(dbRef,'tip/' + form.title))
      .then((snapshot)=>{
        if(snapshot.val()) return this.errorMessService.messageBox('This tip already exists')
        
        set(ref(db, 'tip/' + form.title), {
          title: form.title,
          description : form.description,
        });
        this.getAllTips()
        this.messService.messageBox('Inserted');
      })
  }


  searchTip(form:any){
    this.tips=[];
    const db = getDatabase();
    const tip = ref(db, 'tip/' + form.tipTitle);
    onValue(tip, (snapshot) => {
      if(snapshot.val()){this.tips = [snapshot.val()]}     
    })
  }

  deleteTip(title:any){
    const db = getDatabase();
    remove(ref(db, 'tip/' + title));
    this.getAllTips()
    this.messService.messageBox('Deleted');
  }
  

  getAllTips(){
    this.tips=[];
    const db = getDatabase();
    const dbRef = ref(db, 'tip/');
    
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        this.tips.push(childSnapshot.val());    
            
      });
    }, {
      onlyOnce: true
    });    
  }
 
}

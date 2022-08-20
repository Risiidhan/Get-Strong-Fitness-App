import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageModalComponent } from '../modals/message-modal/message-modal.component';

import { getDatabase, set, ref, onValue, update, remove} from "firebase/database"



@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private dialog:MatDialog) { }




  getAllData(){
    const db = getDatabase();
    const dbRef = ref(db, 'trainees/');
    
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        return (childSnapshot.val());        
      });
    }, {
      onlyOnce: true
    });
  }

  messageBox(title:string){
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '330px',
      panelClass: 'cdk-global-scrollblock',
      data: {
        dataKey: `${title} Successfully !`
      }
    }); 
  }

}

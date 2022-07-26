import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageModalComponent } from '../modals/message-modal/message-modal.component';



@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private dialog:MatDialog) { }

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

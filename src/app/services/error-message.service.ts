import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorMessageComponent } from '../modals/error-message/error-message.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor(private dialog:MatDialog) { }

  messageBox(title:string){
    const dialogRef = this.dialog.open(ErrorMessageComponent, {
      width: '330px',
      panelClass: 'cdk-global-scrollblock',
      data: {
        dataKey: `${title}!`
      }
    }); 
  }

}

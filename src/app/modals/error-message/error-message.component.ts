import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageModalComponent } from '../message-modal/message-modal.component';


@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialog:MatDialogRef<MessageModalComponent>) { }

  message:string='';

  ngOnInit(): void {
    this.message=this.data.dataKey;
  }

  exit(){
    this.matDialog.close();
  }
}

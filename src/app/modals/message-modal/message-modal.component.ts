import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements OnInit {

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

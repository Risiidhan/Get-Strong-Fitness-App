import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { ErrorMessageService } from 'src/app/services/error-message.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    public dialog:MatDialog,
    public auth:AuthService,
    public errMess:ErrorMessageService,
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

    email: string='';


  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      panelClass: 'app-full-bleed-dialog',
      width: '450px',
    });
    this.dialogRef.close();
  }

  forgotPassword(){
    if(this.email=='')return this.errMess.messageBox('Please enter your email')
    this.auth.forgotPassword(this.email)
  }

}

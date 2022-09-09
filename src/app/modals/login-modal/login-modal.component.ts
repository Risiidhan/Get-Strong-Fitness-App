import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginService } from 'src/app/services/login.service';
import { AdminDashboardComponent } from 'src/app/admin/dashboard/admin-dashboard.component';
import { AuthService } from 'src/app/services/auth.service';
import { getDatabase, get, child, set, ref, query, equalTo, orderByChild, onValue, update, remove} from "firebase/database";



@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  constructor(
    private route:Router, 
    public dialog:MatDialog,
    private logService:LoginService,
    private auth: AuthService,
    public dialogRef: MatDialogRef<LoginModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

    email: string='';
    password:string='';
    userDetails:any;
    username:string='';

    resp=false;
    admin=false;
    trainee=true;
    instructor=false;

    ngOnInit(): void {
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(ForgotPasswordComponent, {
        panelClass: 'app-full-bleed-dialog',
        width: '450px',
      });
      this.dialogRef.close(); 
    }

    switchUser(user:string){
      this.admin=false;
      this.trainee=false;
      this.instructor=false;

      if(user=='trainee'){
        this.trainee=true;
      }else if(user=='admin'){
        this.admin=true;
      }else{
        this.instructor=true;
      }
    }

    verifyLogin(): void {
    const db = getDatabase();

      if(this.trainee){
        this.auth.login(this.email,this.password,'trainee')
      }
      
      if(this.admin){
        this.auth.login(this.email,this.password,'admin')
      }
    
      if(this.instructor){
        this.auth.login(this.email,this.password,'instructor')
      }

      this.dialogRef.close();

}
}

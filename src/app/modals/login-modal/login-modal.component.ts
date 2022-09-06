import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Router} from '@angular/router';
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

        const q = query(ref(db,'trainees'), orderByChild('email'), equalTo(this.email));

        get(q)
        .then((snapshot)=>{
          if(!snapshot.val()) return alert('No such email registered under trainees')
          snapshot.forEach(childSnapshot => {
            this.userDetails = childSnapshot.val()
            this.username = this.userDetails.username

            this.logService.setUsername(this.username);
            this.logService.setUserType('trainee')
            this.auth.login(this.email,this.password,this.username)
            this.dialogRef.close();

          })

          
        })

        // this.auth.login(this.email,this.password)
        //   this.dialogRef.close();
        //   this.logService.setUsername(this.username);
        //   this.logService.setUserType('trainee')
        //   this.route.navigate(['/dashboard'])
        //   alert('You have Logged in Successfully!')
      }
      if(this.admin){

        const q = query(ref(db,'admin'), orderByChild('email'), equalTo(this.email));

        get(q)
        .then((snapshot)=>{
          if(!snapshot.val()) return alert('No such email registered under admin')
          snapshot.forEach(childSnapshot => {
            this.userDetails = childSnapshot.val()
            this.username = this.userDetails.username

            this.logService.setUsername(this.username);
            this.logService.setUserType('admin')
            this.auth.login(this.email,this.password,this.username)
            this.dialogRef.close();

          })
      })
      }
    
      if(this.instructor){
        const q = query(ref(db,'instructor'), orderByChild('email'), equalTo(this.email));

        get(q)
        .then((snapshot)=>{
          if(!snapshot.val()) return alert('No such email registered under instructor')
          snapshot.forEach(childSnapshot => {
            this.userDetails = childSnapshot.val()
            this.username = this.userDetails.username

            this.logService.setUsername(this.username);
            this.logService.setUserType('instructor')
            this.auth.login(this.email,this.password,this.username)
            this.dialogRef.close();

          })
      })
    }
}
}

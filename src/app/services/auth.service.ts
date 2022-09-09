import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { LoginService } from './login.service';
import { MessageService } from './message.service';
import { ServerService } from './server.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getDatabase, get, child, set, ref, query, equalTo, orderByChild, onValue, update, remove} from "firebase/database";
import { getAuth, deleteUser } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth:AngularFireAuth, 
    private route:Router,
    private errMess:ErrorMessageService,
    private server:ServerService,
    private logService:LoginService,
    private messService:MessageService,) { }

    userType:any;
    userDetails:any;

  //register method

  register(email:string, password: string, username:string){
    this.auth.createUserWithEmailAndPassword(email,password)
      .then( 
        ()=>{
          this.messService.messageBox('Registered')
        },err=>{

          let code = `(${err.code})`
          let m = err.message
          let message = m.replace(code,'').replace('Firebase:','')

          this.errMess.messageBox(message)
          this.server.removeCustomer(username)
        }
      )
  }



  //login method

  login(email:string, password: string,userT:string){
    this.auth.signInWithEmailAndPassword(email,password)

      .then( () =>{

        const db = getDatabase();

        if(userT=='trainee'){

          const q = query(ref(db,'trainees'), orderByChild('email'), equalTo(email));
  
          get(q)
          .then((snapshot)=>{
            if(!snapshot.val()) return alert('No such email registered under trainees')
            snapshot.forEach(childSnapshot => {
              this.userDetails = childSnapshot.val()
              localStorage.setItem('token',this.userDetails.username);  
              localStorage.setItem('userType','trainee')
              this.messService.messageBox('logged In')
              this.route.navigate(['/dashboard'])

            })          
          })
        }

        if(userT=='admin'){

          const q = query(ref(db,'admin'), orderByChild('email'), equalTo(email));
  
          get(q)
          .then((snapshot)=>{
            if(!snapshot.val()) return alert('No such email registered under admin')
            snapshot.forEach(childSnapshot => {
              this.userDetails = childSnapshot.val()
              localStorage.setItem('token',this.userDetails.username);  
              localStorage.setItem('userType','admin')
              this.messService.messageBox('logged In')
              this.route.navigate(['/admin'])

            })          
          })
        }


        if(userT=='instructor'){

          const q = query(ref(db,'instructor'), orderByChild('email'), equalTo(email));
  
          get(q)
          .then((snapshot)=>{
            if(!snapshot.val()) return alert('No such email registered under instructor')
            snapshot.forEach(childSnapshot => {
              this.userDetails = childSnapshot.val()
              localStorage.setItem('token',this.userDetails.username);  
              localStorage.setItem('userType','instructor')
              this.messService.messageBox('logged In')
              this.route.navigate(['/instructor'])

            })          
          })
        }

      },err =>{
        let code = `(${err.code})`
        let m = err.message
        let message = m.replace(code,'').replace('Firebase:','')
        this.errMess.messageBox(message)
      })
  }

  //signout method

  logout(){
    this.auth.signOut()
      .then(()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('userType');

        this.route.navigate(['/home'])
      })
  }

  //forgot password
  forgotPassword(email:any){
    this.auth.sendPasswordResetEmail(email).
      then(()=>{
        alert(email)
        this.messService.messageBox('Verification link has sent')
      },err=>{
        let code = `(${err.code})`
        let m = err.message
        let message = m.replace(code,'').replace('Firebase:','')
        this.errMess.messageBox(message)
      })
  }
}

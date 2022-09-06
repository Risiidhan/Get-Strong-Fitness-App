import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { LoginService } from './login.service';
import { MessageService } from './message.service';
import { ServerService } from './server.service';
import { Router } from '@angular/router';



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

  login(email:string, password: string,username:string){
    this.auth.signInWithEmailAndPassword(email,password)
      .then( () =>{
        localStorage.setItem('token',username);
        this.userType=this.logService.getUserType()
        alert('You have Logged in successfully')

        if(this.userType=='trainee'){
          this.route.navigate(['/dashboard'])
        }
        if(this.userType=='admin'){
          this.route.navigate(['/admin'])
        }
        if(this.userType=='instructor'){
          this.route.navigate(['/instructor'])
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
        this.route.navigate(['/home'])
      })
  }
}

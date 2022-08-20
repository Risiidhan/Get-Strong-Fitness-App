import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  userType:string='';
  username:string='';

 

  setUsername(name:string){
    this.username=name;
  }
  getUsername(){
    return this.username;
  }  

  setUserType(type:string){
    this.userType=type;
  }

  getUserType(){
    return this.userType;
  }
}

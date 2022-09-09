import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { getDatabase, set, ref, onValue, update} from "firebase/database"
import { ServerService } from 'src/app/services/server.service';
import { MessageService } from '../services/message.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private logService:LoginService, 
    private server:ServerService,
    private messService:MessageService) { }

  username:any='';
  userType:any = '';
  data:any=[{}];

  ngOnInit(): void {
    this.getUser()
    this.setUserType()
    this.getData();
  }


  updateUser(form:any){
    let username = localStorage.getItem('token')

    const db = getDatabase();
    if(this.userType=='admin'){
      this.server.updateAdminDetails(form)
    }
    if(this.userType=='instructor'){
      this.server.updateInstructorFromProfile(form,username)
    }
    this.messService.messageBox('Updated')
  }



  getData(){
    if(this.userType=='admin'){
      const db = getDatabase();
      const adminDetails = ref(db, 'admin/' + 'admin');
      onValue(adminDetails, (snapshot) => this.data = [snapshot.val()])
    }
    if(this.userType=='instructor'){
      const db = getDatabase();
      const adminDetails = ref(db, 'instructor/' + this.username);
      onValue(adminDetails, (snapshot) => this.data = [snapshot.val()])
    }
    if(this.userType=='trainee'){
      const db = getDatabase();
      const adminDetails = ref(db, 'trainees/' + this.username);
      onValue(adminDetails, (snapshot) => this.data = [snapshot.val()])
    }
  }
 


  setUserType(){
    this.userType = localStorage.getItem('userType')
  }

  getUser(){
    this.username = localStorage.getItem('token')
  }

}

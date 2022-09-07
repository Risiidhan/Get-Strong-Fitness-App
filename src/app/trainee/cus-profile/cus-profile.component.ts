import { Component, OnInit } from '@angular/core';
import { getDatabase, set, ref, onValue, update} from "firebase/database"
import { MessageService } from 'src/app/services/message.service';
import { ServerService } from 'src/app/services/server.service';


@Component({
  selector: 'app-cus-profile',
  templateUrl: './cus-profile.component.html',
  styleUrls: ['./cus-profile.component.css']
})
export class CusProfileComponent implements OnInit {

  constructor(
    private server:ServerService,
    private messService:MessageService
  ) { }

  username:any='';
  userType:any = '';
  data:any=[{}];

  ngOnInit(): void {
    this.getUser()
    this.setUserType()
    this.getData();
  }

  updateUser(form:any){
    const db = getDatabase();
    if(this.userType=='admin'){
      this.server.updateAdminDetails(form)
    }
    this.messService.messageBox('Updated')
  }

  getData(){
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

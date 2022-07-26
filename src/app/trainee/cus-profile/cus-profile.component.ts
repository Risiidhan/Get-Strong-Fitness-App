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

  outStanding:any='';
  lDate:any;
  tDate:any;
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
    if(this.userType=='trainee'){
      this.server.updateCustomerFromDb(form,username)
    }
    this.messService.messageBox('Updated')
  }

  getData(){
    if(this.userType=='trainee'){
      const db = getDatabase();
      const adminDetails = ref(db, 'trainees/' + this.username);
      onValue(adminDetails, (snapshot) => this.data = [snapshot.val()])
    }
    
    let lastPay = this.data[0].lastPayment;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    let date = mm + '/' + dd + '/' + yyyy;

    let x = lastPay;
    let y = x.split('/');
    let year = parseInt(y[2]);
    let m = parseInt(y[0]);
    let d = parseInt(y[1]);

    if(year>yyyy){
      this.outStanding=0;
    }
    if(m>parseInt(mm)){
      this.outStanding=0;
    }
    if(year<=yyyy){
      if(m<=parseInt(mm)){
        if(d<parseInt(dd)){
          this.lDate = new Date(lastPay);
          this.tDate = new Date(date);
          let months=Math.abs(this.tDate-this.lDate);
          let x = new Date(months); 
          let month = x.getMonth()+1;
          this.outStanding=month*2500; 
        } 
        else{
          this.outStanding=0;
        }
      }
      if(m<parseInt(mm)){
        this.lDate = new Date(lastPay);
          this.tDate = new Date(date);
          let months=Math.abs(this.tDate-this.lDate);
          let x = new Date(months); 
          let month = x.getMonth()+1;
          this.outStanding=month*2500;  
      }
    }

    console.log(52);
    
  }

  setUserType(){
    this.userType = localStorage.getItem('userType')
  }

  getUser(){
    this.username = localStorage.getItem('token')
  }

}

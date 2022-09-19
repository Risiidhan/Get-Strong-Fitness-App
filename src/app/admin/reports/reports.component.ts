import { Component, OnInit } from '@angular/core';
import { getDatabase, get, child, startAt, set, ref, query, equalTo, orderByChild, onValue, update, remove} from "firebase/database";
import { ServerService } from 'src/app/services/server.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {


  constructor(
    private server:ServerService
  ) { }

  customer:any=[];
  instructors:any=[];
  pipe = new DatePipe('en-US');

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(){
    this.customer=[];
    this.server.getAllCustomer(this.customer);

    this.instructors=[];
    this.server.getAllInstructor(this.instructors);
  }

  onChangeInstructor(deviceValue:any) {
    let ChangedFormat = this.pipe.transform(deviceValue.value, 'MM/dd/YYYY');
    const db = getDatabase();
    this.instructors=[];
    const q = query(ref(db,'instructor'), orderByChild('joinDate'), startAt(ChangedFormat));
      get(q)
    .then((snapshot)=>{
      snapshot.forEach(childSnapshot => {
        this.instructors.push(childSnapshot.val())
      })          
    })
  }



onChangeCustomer(deviceValue:any) {
  let ChangedFormat = this.pipe.transform(deviceValue.value, 'MM/dd/YYYY');
  const db = getDatabase();
  this.customer=[];
  const q = query(ref(db,'trainees'), orderByChild('joinDate'), startAt(ChangedFormat));
    get(q)
  .then((snapshot)=>{
    snapshot.forEach(childSnapshot => {
      this.customer.push(childSnapshot.val())
    })          
  })

}



}

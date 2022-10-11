import { Component, OnInit } from '@angular/core';
import { getDatabase, get, child, startAt, set, ref, query, equalTo, orderByChild, onValue, update, remove} from "firebase/database";
import { ServerService } from 'src/app/services/server.service';
import { DatePipe } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 

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
  data:any='';


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

  download(id:any){
    this.data = document.getElementById(id);  //Id of the table
    html2canvas(this.data).then(canvas => {  
      // Few necessary setting options  
      let imgWidth = 208;   
      let pageHeight = 295;    
      let imgHeight = canvas.height * imgWidth / canvas.width;  
      let heightLeft = imgHeight;  

      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      if(id=='customerReport')  {
        pdf.save('Customer-Report.pdf'); // Generated PDF   
      }
      if(id=='instReport')  {
        pdf.save('Instructor-Report.pdf'); // Generated PDF   
      }
    });  
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

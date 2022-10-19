import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { getDatabase, get, child, set, ref, query, equalTo, orderByChild, onValue, update, remove} from "firebase/database";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 


@Component({
  selector: 'app-workout-report',
  templateUrl: './workout-report.component.html',
  styleUrls: ['./workout-report.component.css']
})
export class WorkoutReportComponent implements OnInit {
  
  constructor() { }

  @ViewChild('workoutReport',{static:false}) el! : ElementRef;

  workoutReport:any = [];
  userName:any='';
  newArr:any = [];
  data:any='';

  
  ngOnInit(): void {
    this.getReport()
  }

  download(){
    this.data = document.getElementById('workoutReport');  //Id of the table
    html2canvas(this.data).then(canvas => {  
      // Few necessary setting options  
      let imgWidth = 208;
      let pageHeight = 295;    
      let imgHeight = canvas.height * imgWidth / canvas.width;  
      let heightLeft = imgHeight;  

      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 1, position, imgWidth, imgHeight)  
      pdf.save('workoutReport.pdf'); // Generated PDF   
    });  
  }

  getReport(){

    this.userName=localStorage.getItem('token');

    this.workoutReport=[];
    const db = getDatabase();
    const tip = ref(db, 'workoutReport/' + this.userName);
    onValue(tip, (snapshot) => {
      if(snapshot.val()){this.workoutReport = [snapshot.val()]}     
      this.newArr.push(this.workoutReport[0])
      console.log(this.newArr);
    })
    
  }

}

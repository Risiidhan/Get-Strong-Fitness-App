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
  newCust:any='';
  outstanding:any='';
  lDate:any;
  tDate:any;


  ngOnInit(): void {
    this.getAllData();
  }

  

  getAllData(){
    this.customer=[];
    const db = getDatabase();
    const dbRef = ref(db, 'trainees/');
    
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        this.customer.push(childSnapshot.val());  
      });
      for(let i=0;i<this.customer.length;i++){
        this.newCust+=(this.customer[i].lastPayment)+',';
      }
      this.newCust=this.newCust.split(',')

      for(let i=0; i<this.newCust.length;i++){
        if(this.newCust[i]!=''){

        let lastPay = this.newCust[i];
          
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

        console.log(year,m,d,yyyy,mm,dd);
        
        if(year>yyyy){
          this.outstanding+=0+',';
        }
        if(m>parseInt(mm)){
          this.outstanding+=0+',';
        }
        if(year<=yyyy){
          if(m==parseInt(mm)){
            if(d<parseInt(dd)){
              this.lDate = new Date(lastPay);
              this.tDate = new Date(date);
              let months=Math.abs(this.tDate-this.lDate);
              let x = new Date(months); 
              let month = x.getMonth()+1;
              this.outstanding+=month*2500+',';  
            } 
            else{
              this.outstanding+=0+',';
            }
          }
          if(m<parseInt(mm)){
            this.lDate = new Date(lastPay);
              this.tDate = new Date(date);
              let months=Math.abs(this.tDate-this.lDate);
              let x = new Date(months); 
              let month = x.getMonth()+1;
              this.outstanding+=month*2500+',';  
          }
        }
      }
      }
      this.outstanding=this.outstanding.split(',');
      console.log(this.outstanding);

    }, {
      onlyOnce: true
    });
    


  
    

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

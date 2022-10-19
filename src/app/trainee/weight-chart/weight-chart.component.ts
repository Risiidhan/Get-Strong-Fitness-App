import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { getDatabase, child, get, set, ref, onValue, update, remove} from "firebase/database"
import { ErrorMessageService } from 'src/app/services/error-message.service';


@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.component.html',
  styleUrls: ['./weight-chart.component.css']
})
export class WeightChartComponent implements OnInit {

  constructor(private errorMess:ErrorMessageService) { 
    Chart.register(...registerables);
  }

  weight:any=[];
  dates:any=[];
  addedWeight:number=74.2;
  lineChart:any;
  
  ngOnInit(): void {
    this.generateChart()  
  }

   //generate chart
   generateChart(){
    let username = localStorage.getItem('token')

    this.weight=[];
    const db = getDatabase();
    const weights = ref(db, 'userDailyWeight/' + username);
    onValue(weights, (snapshot) => {
      if(snapshot){ 
      let data = snapshot.val()
      for(let i=0;i<data.date.length;i++){
        this.weight.push(data.weight[i])
        this.dates.push(data.date[i])
      }
    }
      const lineCanvasEle: any = document.getElementById('line_chart')
      
      this.lineChart = new Chart(lineCanvasEle.getContext('2d'), {
        type: 'line',
          data: {
            labels: this.dates,
            datasets: [
              { data: this.weight, label: 'Weight', borderColor: 'rgba(54, 162, 235)' },
            ],
          },
          options: {
            elements: {
              line: {
                tension: 0.5
              }
            },
            maintainAspectRatio:false,
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                      display: false
                    }
                },
                x: {
                  display:true,
                  grid: {
                    display: false
                  }
  
                },
            },
            plugins: {
              legend: {
                display: false
              }
            }
          }
        });
      
    })

   
  }

  updateChart(){

    var today = new Date();
    var day = (today.getMonth()+1)+'/'+today.getDate()+'/';

    if(this.lineChart.data.labels.includes(day)||!this.lineChart.data.labels.includes(day.toString())){ 
      this.errorMess.messageBox('Your Weight for today has been already added')
      return
    }
    else{
      this.lineChart.data.datasets[0].data.push(this.addedWeight);
      this.lineChart.data.labels.push(day);
      this.lineChart.update();
      this.addUserWeighttToDb(this.addedWeight,day)
    }
  }

  addUserWeighttToDb(weight:any,day:any){
    let username = localStorage.getItem('token')
    const db = getDatabase();
    set(ref(db, 'userDailyWeight/' + username), {
      weight:this.weight,
      date:this.dates
    });  
    let l = this.weight.length-1;
    let latestWeight = this.weight[l]
      update(ref(db, 'trainees/' + username), {
        weight: latestWeight,
      });
   
  }
  


}

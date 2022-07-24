import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.component.html',
  styleUrls: ['./weight-chart.component.css']
})
export class WeightChartComponent implements OnInit {

  constructor() { 
    Chart.register(...registerables);
  }

  addedWeight:number=74.2;
  lineChart:any;
  ngOnInit(): void {
    this.generateChart()
  }

   //generate chart
   generateChart(){
    const lineCanvasEle: any = document.getElementById('line_chart')
    this.lineChart = new Chart(lineCanvasEle.getContext('2d'), {
      type: 'line',
        data: {
          labels: ['07/16','07/17','07/18','07/19','07/20','07/21','07/22'],
          datasets: [
            { data: [74.1,74,74.3,73.8,74.2,74.2,74.4], label: 'Weight', borderColor: 'rgba(54, 162, 235)' },
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
  }

  updateChart(){

    var today = new Date();
    var day = (today.getMonth()+1)+'/'+today.getDate();

    if(!this.lineChart.data.labels.includes(day)){ 
      this.lineChart.data.datasets[0].data.push(this.addedWeight);
      this.lineChart.data.labels.push(day);
      this.lineChart.update();
    }
    else{
      alert('Your Weight for today has been already added')
    }
  }


}

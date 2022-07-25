import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';



@Component({
  selector: 'app-calorie-chart',
  templateUrl: './calorie-chart.component.html',
  styleUrls: ['./calorie-chart.component.css']
})
export class CalorieChartComponent implements OnInit {


  constructor() { 
    Chart.register(...registerables);

  }
  totalCal='0'


  ngOnInit(): void {
    this.generateChart();
  }

  generateChart(){

    //let takenCalories=2500;

    //since its 0
    let takenCalories=parseInt(this.totalCal);

    //from database
    let requiredCalories = 2600;
    const counter = {
      id:'counter',
      beforeDraw(chart:any,args:any,options:any){
        const { ctx, chartArea: {top, right, bottom, left , width, height}} = chart;
        ctx.save();
        ctx.fillStyle='gray';
        ctx.font = "30px em Lato, sans-serif";
        ctx.textAlign = 'center';
        ctx.fillText(`${takenCalories} / ${requiredCalories}`,width/2,top+(height/2));
        ctx.font = "25px em Lato, bold, sans-serif";
        ctx.fillText(`calories`,width/2,top+(height/1.6));

      }
    }
    const doughnut_chart: any = document.getElementById('doughnut_chart')
    const doughnut = new Chart(doughnut_chart.getContext('2d'), {
      type: 'doughnut',
        data: {
          labels: [],
          datasets: [
            // firstElement/Total * 100
            { data: [takenCalories,requiredCalories-takenCalories], label: 'Weight',   backgroundColor: [
              'orange',
              'transparent',
              
            ],
            borderRadius:7,
            hoverOffset: 4 },
          ],
        },
        options: {
          cutout:100,
          elements: {
            arc: {
              borderWidth: 0
            }
          },
          responsive: false,
          scales: {
              y: {
                display:false,

                  beginAtZero: false,
                  grid: {
                    display: false
                  }
              },
              x: {
                display:false,
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
        },
        plugins:[counter]
      });
  }

}

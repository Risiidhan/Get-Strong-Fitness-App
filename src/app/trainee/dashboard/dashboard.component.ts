import { Component, OnInit, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CalculateCaloriesService } from 'src/app/calculate-calories.service';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private calService:CalculateCaloriesService) { 
    Chart.register(...registerables);

  }

  item=[{
    "items": [
      {
        "sugar_g": 2.6,
        "fiber_g": 1.2,
        "serving_size_g": 100.0,
        "sodium_mg": 4,
        "name": "tomato",
        "potassium_mg": 23,
        "fat_saturated_g": 0.0,
        "fat_total_g": 0.2,
        "calories": 18.2,
        "cholesterol_mg": 0,
        "protein_g": 0.9,
        "carbohydrates_total_g": 3.9
      }
    ]
  }]

    // set propertise
    username: string='User';
    items:any[] = [];
    foodItem='';
    totalProtein='0';
    totalCarbs='0';
    totalFat='0';
    totalCal='0';
    doughnut:any=null;
    
    


  ngOnInit(): void {
     this.generateChart();
     this.getUser();
  }



  getUser(){
    this.username = this.calService.getUsername();
  }
  
  generateChart(){
    //since its 0
    let takenCalories=parseInt(this.totalCal);
    //from database
    let requiredCalories = 2600;
    let counter = {
      id:'counter',
      beforeDraw(chart:any,args:any,options:any){

        let { ctx, chartArea: {top, right, bottom, left , width, height}} = chart;
        ctx.save();
        ctx.fillStyle='gray';
        ctx.font = "30px em Lato, sans-serif";
        ctx.textAlign = 'center';
        ctx.fillText(`${takenCalories} / ${requiredCalories}`,width/2,top+(height/2));
        ctx.font = "25px em Lato, bold, sans-serif";
        ctx.fillText(`calories`,width/2,top+(height/1.6));
        let chartStatus = Chart.getChart("doughnut_chart"); // <canvas> id
        ctx.restore();
        
      }
    }

    let doughnut_chart: any = document.getElementById('doughnut_chart')
    this.doughnut = new Chart(doughnut_chart.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: [],
          datasets: [
            {
              data: [takenCalories,requiredCalories-takenCalories], 
              label: 'Weight',   
              backgroundColor: [
                'orange',
                '#F2F2F2',
              ],
              borderRadius:7,
              hoverOffset: 4
          },
          ],
        },
        options: {
          plugins: {
            
            legend: {
              display: false
            },
          },
          cutout:90,
          elements: {
            arc: {
              borderWidth: 0
            }
          },
          maintainAspectRatio:false,
          responsive: true,
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
          
        },
        plugins:[counter]
      }); 
  };
 

  destroyChart(chart:Chart){
    chart.destroy();
  }

  //calculate total calries od P C and F 
  calculateCal(){
    let calories=0;
    let fat=0;
    let carbs=0;
    let protein =0;
    console.log(this.items.length)

    for(let i=0;i<this.items.length;i++){
      carbs+=this.items[i].items[0].carbohydrates_total_g;
      protein+=this.items[i].items[0].protein_g;
      fat+=this.items[i].items[0].fat_total_g;
      calories+=this.items[i].items[0].calories;
    }

    this.totalCal=calories.toFixed(0);
    this.totalCarbs=carbs.toFixed(1);
    this.totalProtein=protein.toFixed(1);
    this.totalFat=fat.toFixed(1);
    this.destroyChart(this.doughnut);
    this.generateChart();
  }


  // get respond from api
  addFood(food:string){
    this.calService.getCalories(food)
      .subscribe(data=>{
        this.items.push(data)
      })

  }

  //add food to list
  public addToList() {
    if (this.foodItem == '') {
    }
    else {
        
        this.addFood(this.foodItem)
        this.foodItem = '';
        this.calculateCal()

    }
  }

  //remove food from list
  public deleteTask(index:any) {
      this.items.splice(index, 1);
      this.calculateCal();

  }

  data:any= function () {
		return {
			showSidebar: false,
		};
	}

}

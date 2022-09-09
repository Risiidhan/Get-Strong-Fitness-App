import { Component, OnInit, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CalculateCaloriesService } from 'src/app/services/calculate-calories.service';
import { Chart, registerables } from 'chart.js';
import { getDatabase, child, get, set, ref, onValue, update, remove} from "firebase/database"
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ServerService } from 'src/app/services/server.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private calService:CalculateCaloriesService, 
    private http: HttpClient,
    private db:ServerService,
    private logService:LoginService) { 
    Chart.register(...registerables);

  }

    // set propertise
    username: any='User';
    items:any[] = [];
    foodItem='';
    totalProtein='0';
    totalCarbs='0';
    totalFat='0';
    totalCal='0';
    doughnut:any=null;
    customer:any=[];
    currentWeight:string='';
    exerciseLevel:string='';
    requiredCalorie:any;
    reqCarb:any
    reqFat:any
    reqPro:any

    
  ngOnInit(): void {
    this.getUser();
    this.getFoodListFromDb()
  }

  generateChart(){
    //since its 0
    let takenCalories=parseInt(this.totalCal);
    //from database    
    let requiredCalories = parseInt(this.requiredCalorie);
    if(takenCalories>=requiredCalories) {takenCalories = requiredCalories}

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
     //since its 0
     let takenCalories=parseInt(this.totalCal);
     //from database
     let requiredCalories = 2600;
    this.calService.getCalories(food)
      .subscribe(data=>{
        this.items.push(data)
        if(takenCalories<requiredCalories){ 
          this.calculateCal()
        }
        this.addFoodListToDb()

      })
  }

  //add food to list
  public addToList() {        
        this.addFood(this.foodItem)
        this.foodItem = '';
  }

  //remove food from list
  public deleteTask(index:any) {
      this.items.splice(index, 1);
      this.calculateCal();
      this.addFoodListToDb()

  }

  data:any= function () {
		return {
			showSidebar: false,
		};
	}

  getUser(){
    this.username = localStorage.getItem('token')
    this.items=[];

    const db = getDatabase();
    const tip = ref(db, 'trainees/' + this.username);
    onValue(tip, (snapshot) => {
      this.customer.push(snapshot.val())
      
      
      let currentWeight = this.customer[0].weight;
      this.currentWeight=currentWeight
      let exLevel = this.customer[0].exerciseLevel;
      this.exerciseLevel=exLevel;
      let heightInCm = this.customer[0].height * 30.48;
      let age = this.customer[0].age;
      let gender = this.customer[0].gender;
      let requiredCal;
      
      if(gender == 'Female'){
        requiredCal = 655.1 + (9.563*currentWeight) + (1.850*heightInCm) - (4.676*age)
        if(exLevel=='Not Very Active')  {requiredCal=requiredCal*1.1}
        if(exLevel=='Moderately Active')  {requiredCal=requiredCal*1.2}
        if(exLevel=='Exercises 1-3 days/week')  {requiredCal=requiredCal*1.375}
        if(exLevel=='Exercises 3-5 days/week')  {requiredCal=requiredCal*1.55}
        requiredCal=requiredCal.toFixed(0)
        this.requiredCalorie=requiredCal
        
      }
      if(gender == 'Male'){
        requiredCal = 66.47 + (13.75*parseInt(currentWeight)) + (5.003*(heightInCm/1)) - (6.755*parseInt(age))
        if(exLevel=='Not Very Active')  {requiredCal=requiredCal*1.1}
        if(exLevel=='Moderately Active')  {requiredCal=requiredCal*1.2}
        if(exLevel=='Exercises 1-3 days/week')  {requiredCal=requiredCal*1.375}
        if(exLevel=='Exercises 3-5 days/week')  {requiredCal=requiredCal*1.55}
        requiredCal=requiredCal.toFixed(0)
        this.requiredCalorie=requiredCal
      }
      
      this.reqPro = parseInt(currentWeight)*2.2;
      this.reqCarb = this.reqPro*2;
      this.reqFat = ((parseInt(this.requiredCalorie) - ((this.reqPro*4)+(this.reqCarb*4)))/9).toFixed(1);
    })
    this.generateChart();
  }


  addFoodListToDb(){
    const db = getDatabase();
    set(ref(db, 'userFoodList/' + this.username), {
      foods:this.items
    });  
    
  }

  getFoodListFromDb(){
    this.items=[];
    const db = getDatabase();
    const tip = ref(db, 'userFoodList/' + this.username);
    onValue(tip, (snapshot) => {
      let food = snapshot.val()
      this.items= food.foods;
      this.calculateCal()
    })
  }
}

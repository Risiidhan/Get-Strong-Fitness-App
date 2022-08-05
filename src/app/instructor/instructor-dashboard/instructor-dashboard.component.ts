import { Component, OnInit } from '@angular/core';
import { CalculateCaloriesService } from 'src/app/calculate-calories.service';


@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css']
})
export class InstructorDashboardComponent implements OnInit {

  constructor(private calService:CalculateCaloriesService) { }

  workout = [
    {
      title:'Full Body',
      category:'Advanced',
      targetMuscle:'Entire Body',
      shedule:{
        exercise1 : '5 set x 12 rep',
        exercise2 : '5 set x 12 rep',
        exercise3 : '5 set x 12 rep',
        exercise4 : '5 set x 12 rep',
        exercise5 : '5 set x 12 rep',
      }
        
    },
    {
      title:'Bro Split',
      category:'Beginner',
      targetMuscle:'Chest Day',
      shedule:{
        exercise1 : '5 set x 12 rep',
        exercise2 : '5 set x 12 rep',
        exercise3 : '5 set x 12 rep',
        exercise4 : '5 set x 12 rep',
        exercise5 : '5 set x 12 rep',
      }

    },
    {
      title:'Bro Split',
      category:'Beginner',
      targetMuscle:'Chest Day',
      shedule:{
        exercise1 : '5 set x 12 rep',
        exercise2 : '5 set x 12 rep',
        exercise3 : '5 set x 12 rep',
        exercise4 : '5 set x 12 rep',
        exercise5 : '5 set x 12 rep',
      }

    },
    {
      title:'Bro Split',
      category:'Beginner',
      targetMuscle:'Chest Day',
      shedule:{
        exercise1 : '5 set x 12 rep',
        exercise2 : '5 set x 12 rep',
        exercise3 : '5 set x 12 rep',
        exercise4 : '5 set x 12 rep',
        exercise5 : '5 set x 12 rep',
      }

    },
    {
      title:'Bro Split',
      category:'Beginner',
      targetMuscle:'Chest Day',
      shedule:{
        exercise1 : '5 set x 12 rep',
        exercise2 : '5 set x 12 rep',
        exercise3 : '5 set x 12 rep',
        exercise4 : '5 set x 12 rep',
        exercise5 : '5 set x 12 rep',
      }

    }
  ]

  tips = [
    {
      title:'Gain Weight',
      decription:' consectetur nam quod neque dolore, distinctio tempore.',
    },
    {
      title:'Hig Carbs',
      decription:' consectetur nam quod neque dolore, distinctio tempore.',
    },
    {
      title:'Hig Carbs',
      decription:' consectetur nam quod neque dolore, distinctio tempore.',
    },
    {
      title:'Hig Carbs',
      decription:' consectetur nam quod neque dolore, distinctio tempore.',
    },
    {
      title:'Hig Carbs',
      decription:' consectetur nam quod neque dolore, distinctio tempore.',
    }
  ]

  username: string='User';


  ngOnInit(): void {
    this.username = this.calService.getUsername();

  }

}

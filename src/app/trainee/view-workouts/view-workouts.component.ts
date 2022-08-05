import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-workouts',
  templateUrl: './view-workouts.component.html',
  styleUrls: ['./view-workouts.component.css']
})
export class ViewWorkoutsComponent implements OnInit {

  constructor() { }

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
  
  ngOnInit(): void {
  }

}

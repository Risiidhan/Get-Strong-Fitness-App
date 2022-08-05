import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  customer = [
    {
      username:'Risiidhan',
      name:'Risiidhan Punniyamoorthy',
      age: 21,
      address:'7 Wintergreen Dr.Brookfield, WI 53045',
      gender: 'male',
      contact:'076638757',
      password:'123'
    },
    {
      username:'Kamal',
      name:'Kamal Kumar',
      age: 22,
      address:'8688 Bohemia St.Conway, SC 29526',
      gender: 'male',
      contact:'0785555715',
      password:'demkfme'

    }
  ];

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
  constructor() { }

  ngOnInit(): void {
    
  }

}

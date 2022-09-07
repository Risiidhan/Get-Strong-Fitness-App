import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { getDatabase, set, ref, onValue, update, remove} from "firebase/database"



@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css']
})
export class InstructorDashboardComponent implements OnInit {

  constructor(private logService:LoginService) { }

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

  tips:any = [];


  username:any;


  ngOnInit(): void {
    this.username = localStorage.getItem('token')
    this.getAllTips()
  }

  getAllTips(){
    this.tips=[];
    const db = getDatabase();
    const dbRef = ref(db, 'tip/');
    
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        this.tips.push(childSnapshot.val());                
      });
    }, {
      onlyOnce: true
    });    
  }
}

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

  workout:any = []

  tips:any = [];


  username:any;


  ngOnInit(): void {
    this.username = localStorage.getItem('token')
    this.getAllTips()
    this.getAllWorkout();
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

  getAllWorkout(){
    this.workout=[];
    const db = getDatabase();
    const dbRef = ref(db, 'workout/');
    
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        console.log(childSnapshot.val());
        this.workout.push(childSnapshot.val());    
      });
    }, {
      onlyOnce: true
    });    
  }
}

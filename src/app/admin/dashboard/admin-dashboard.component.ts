import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { getDatabase, set, ref, onValue, update, remove} from "firebase/database"


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  InstructorsCount=0;
  TraineesCount=0;
  count=0;

  instructors:any=[];

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

  workout:any = []

  data:any;
  constructor(private server:ServerService) { }

  ngOnInit(): void {
    this.getTraineesCount()
    this.getInstructorsCount()
    this.getAllInstructors()
    this.getAllWorkout()
  }


  getAllInstructors(){
    this.instructors=[];
    this.server.getAllInstructor(this.instructors);
  }

  getTraineesCount(){
    const db = getDatabase();
    const dbRef = ref(db, 'trainees/');
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.TraineesCount++       
      });
    }, {
      onlyOnce: true
    });
  }

  getInstructorsCount(){ 
    const db = getDatabase();
    const dbRef = ref(db, 'instructor/');
    
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.InstructorsCount++       
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


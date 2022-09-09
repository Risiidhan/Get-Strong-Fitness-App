import { Component, OnInit } from '@angular/core';
import { getDatabase, get, child, set, ref, query, equalTo, orderByChild, onValue, update, remove} from "firebase/database";

@Component({
  selector: 'app-view-workouts',
  templateUrl: './view-workouts.component.html',
  styleUrls: ['./view-workouts.component.css']
})
export class ViewWorkoutsComponent implements OnInit {

  constructor() { }

  begineerWorkout:any = []
  advancedWorkout:any=[]
  intermediateWorkout:any=[]

  
  ngOnInit(): void {
    this.getWorkout()
  }

  getWorkout(){

    const db = getDatabase();
    
    const begineer = query(ref(db,'workout'), orderByChild('category'), equalTo('Begineer'));
    const advanced = query(ref(db,'workout'), orderByChild('category'), equalTo('Advanced'));
    const intermediate = query(ref(db,'workout'), orderByChild('category'), equalTo('Intermediate'));

  
         get(begineer)
          .then((snapshot)=>{
            snapshot.forEach(childSnapshot => {
              this.begineerWorkout.push(childSnapshot.val())
            })          
          })

          get(advanced)
          .then((snapshot)=>{
            snapshot.forEach(childSnapshot => {
              this.advancedWorkout.push(childSnapshot.val())
            })          
          })
          
          get(intermediate)
          .then((snapshot)=>{
            snapshot.forEach(childSnapshot => {
              this.intermediateWorkout.push(childSnapshot.val())
            })          
          })
  }

}

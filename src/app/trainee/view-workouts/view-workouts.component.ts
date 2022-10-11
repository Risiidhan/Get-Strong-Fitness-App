import { Component, OnInit } from '@angular/core';
import { getDatabase, get, child, set, ref, query, equalTo, orderByChild, onValue, update, remove} from "firebase/database";

@Component({
  selector: 'app-view-workouts',
  templateUrl: './view-workouts.component.html',
  styleUrls: ['./view-workouts.component.css']
})
export class ViewWorkoutsComponent implements OnInit {

  constructor() { }

  userWorkout:any = []
  userName:any='';
  status='Pending';
  myObj:any={};
  workoutReport:any = [];
  arr:any = [];


  getWorkoutOrder:any = [];
  
  ngOnInit(): void {
    this.getWorkout();
    this.getReport();
    
  }

  complete(index:any){

    let text = document.getElementsByClassName(`status[${index}]`)[0];
    text.innerHTML='Status : Completed';
    this.checkExComplete()

    let len = this.workoutReport[0].week.length;
    len=len-1;

    let date = document.getElementsByClassName(`day`)[index].innerHTML;

    this.workoutReport[0].week[len][date] = 'Completed'
    console.log(len);

    this.addReport();
  }


  inComplete(index:any){
    let text = document.getElementsByClassName(`status[${index}]`)[0];
    text.innerHTML='Status : Incompleted';
    this.checkExComplete()

    let len = this.workoutReport[0].week.length;
    len=len-1;

    let date = document.getElementsByClassName(`day`)[index].innerHTML;

    this.workoutReport[0].week[len][date]= 'Incompleted'
    console.log(this.workoutReport);
    
    this.addReport();

  }

  addReport(){
    let username = localStorage.getItem('token')

    const db = getDatabase();
    update(ref(db, 'workoutReport/' +username), {
      week:this.workoutReport[0].week
    });
  }


  checkExComplete(){
    let noOfEx = document.getElementsByClassName('status');

    for(let i =0;i<noOfEx.length;i++){
      
      if(noOfEx[i].innerHTML=="Status : Pending"){
        let b = document.getElementById("finalBtn")as HTMLButtonElement | null;
        b?.setAttribute('disabled', '');
      }
      else{
        let b = document.getElementById("finalBtn")as HTMLButtonElement | null;
        b?.removeAttribute('disabled');
      }
    }
  }


  
  getReport(){

    this.userName=localStorage.getItem('token');

    this.workoutReport=[];
    const db = getDatabase();
    const tip = ref(db, 'workoutReport/' + this.userName);
    onValue(tip, (snapshot) => {
      if(snapshot.val()){this.workoutReport = [snapshot.val()]}     
    })
    console.log(this.workoutReport);
    
  }


  getWorkout(){
    this.userName=localStorage.getItem('token');
    let username=localStorage.getItem('token');

    const db = getDatabase();
    const workout = query(ref(db,'workout'), orderByChild('username'), equalTo(username));

    get(workout)
          .then((snapshot)=>{
            snapshot.forEach(childSnapshot => {
              this.getWorkoutOrder.push(childSnapshot.val());
             
            })   

            let mon,tues,wed,thur,fri;

            for(let i=0;i<this.getWorkoutOrder.length;i++){
              if(this.getWorkoutOrder[i].day=='Monday'){
                mon = this.getWorkoutOrder[i]
              }
              if(this.getWorkoutOrder[i].day=='Tuesday'){
                tues = this.getWorkoutOrder[i]
              }
              if(this.getWorkoutOrder[i].day=='Wednesday'){
                wed = this.getWorkoutOrder[i]
              }
              if(this.getWorkoutOrder[i].day=='Thursday'){
                thur = this.getWorkoutOrder[i]
              }
              if(this.getWorkoutOrder[i].day=='Friday'){
                fri = this.getWorkoutOrder[i]
              }
            }

            // let len = this.workoutReport.length;
            // len=len-1;
            // let status = document.getElementsByClassName('status')

            // for(let i=0;i<status.length;i++){
            //   status[1].innerHTML= 'Friday';

            //   if(document.getElementsByClassName('day')[i].innerHTML=='Monday'){
            //     status[i].innerHTML=this.workoutReport[len].week[0].Monday
            //   }
            //   if(document.getElementsByClassName(`day`)[i].innerHTML=='Tuesday'){
            //     status[i].innerHTML=this.workoutReport[len].week[0].Tuesday
            //   }
            //   if(document.getElementsByClassName(`day`)[i].innerHTML=='Wednesday'){
            //     status[i].innerHTML=this.workoutReport[len].week[0].Wednesday
            //   }
            //   if(document.getElementsByClassName(`day`)[i].innerHTML=='Thursday'){
            //     status[i].innerHTML=this.workoutReport[len].week[0].Thursday
            //   }
            //   if(document.getElementsByClassName(`day`)[i].innerHTML=='Friday'){
            //     status[i].innerHTML= 'Friday';
            //   }
            // }
            this.userWorkout.push(mon,tues,wed,thur,fri);         
            this.checkExComplete();

            this.arr=[];
            let i = this.workoutReport[0].week.length-1;
            this.arr.push(this.workoutReport[0].week[i])
            console.log(this.arr);
            
          })


  }

  onSubmit() {
    // let mon,tues,wed,thur,fri; 
    // let mStat,tStat,wStat,thStat,fState

    // let days = document.getElementsByClassName(`day`);

    
  
    // for(let i=0;i<days.length;i++){
    //   let day = days[i].innerHTML;
    //   if(day=='Monday'){
    //     let status =document.getElementsByClassName(`status[${i}]`)[0].innerHTML;    
    //     let s = status.split(':');
    //     mStat=s[1];
    //   }
    //   if(day=='Tuesday'){
    //     let status =document.getElementsByClassName(`status[${i}]`)[0].innerHTML;    
    //     let s = status.split(':');
    //     tStat=s[1];
    //   }
    //   if(day=='Wednesday'){
    //     let status =document.getElementsByClassName(`status[${i}]`)[0].innerHTML;    
    //     let s = status.split(':');
    //     wStat=s[1];
    //   }
    //   if(day=='Thursday'){
    //     let status =document.getElementsByClassName(`status[${i}]`)[0].innerHTML;    
    //     let s = status.split(':');
    //     thStat=s[1];
    //   }
    //   if(day=='Friday'){
    //     let status =document.getElementsByClassName(`status[${i}]`)[0].innerHTML;    
    //     let s = status.split(':');
    //     fState=s[1];
    //   }

      
    // }
    // this.workoutReport.push(
    //   {
    //     Monday:mStat,
    //     Tuesdat:tStat,
    //     Wednesday:wStat,
    //     Thursday:thStat,
    //     Friday:fState
    //   }
    // )

    this.workoutReport[0].week.push(
      {
        Monday:'Pending',
        Tuesday:'Pending',
        Wednesday:'Pending',
        Thursday:'Pending',
        Friday:'Pending'
      }
    )
  
    this.addReport();
    this.getWorkout();


    
    // const db = getDatabase();
    // const dbRef = ref(db)
    
    //       set(ref(db, 'workoutReport/' + this.userName), {
    //         form: form.day,
    //         username:form.username,
    //         targetMuscle:form.targetMuscle,
    //         schedule:form.shedule

    //       });
    //     // this.getAllWorkout()
    //     // this.messService.messageBox('Inserted');
    //   })
  }

}

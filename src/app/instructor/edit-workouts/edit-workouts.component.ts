import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { getDatabase, child, get, set, ref, onValue, update, remove} from "firebase/database"
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { MessageService } from 'src/app/services/message.service';



@Component({
  selector: 'app-edit-workouts',
  templateUrl: './edit-workouts.component.html',
  styleUrls: ['./edit-workouts.component.css']
})
export class EditWorkoutsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private messService:MessageService,
    private errorMessService:ErrorMessageService) { }

  workout:any = []
  trainee:any;

  searchWorkoutForm = new FormGroup({
    workoutName: new FormControl(''),
  });

  editWorkoutForm = this.fb.group({
    day: ['',Validators.required],
    username: ['',Validators.required],
    targetMuscle: ['',Validators.required],
    shedule: this.fb.array([
      this.exFormGroup()
    ]),
  });
  

  ngOnInit(): void {
    this.getAllWorkout()
  }

  get shedule() {
    return this.editWorkoutForm.get('shedule') as FormArray;
  }

  addExercise() {
    this.shedule.push(this.exFormGroup());
  }

  exFormGroup(){
    return this.fb.group({
      exerciseName: ['',Validators.required],
      setAndReps: ['',Validators.required],
    })
  }

  removeExercise(i:any) {
    this.shedule.removeAt(i);
  }


  onSubmit(form:any) {
    this.trainee = form.username;
    const db = getDatabase();
    const dbRef = ref(db)
    get(child(dbRef,'workout/' + form.username+' '+form.day))
      .then((snapshot)=>{
        if(snapshot.val()) return this.errorMessService.messageBox('This workout already exists')
        
          set(ref(db, 'workout/' + form.username+' '+form.day), {
            day: form.day,
            username:form.username,
            targetMuscle:form.targetMuscle,
            schedule:form.shedule

          });
        this.getAllWorkout()
        this.messService.messageBox('Inserted');
        this.addReport();
      })
  }

  addReport(){
    let arr = [      {
      Monday:'Pending',
      Tuesday:'Pending',
      Wednesday:'Pending',
      Thursday:'Pending',
      Friday:'Pending'
    }]
    const db = getDatabase();
    set(ref(db, 'workoutReport/' + this.trainee), {
      week:arr
    });  
  }

  updateTip(form:any){
    const db = getDatabase();
    update(ref(db, 'workout/' + form.username+' '+form.day), {
      day: form.day,
      username:form.username,
      targetMuscle:form.targetMuscle,
      schedule:form.shedule
    });
    this.getAllWorkout()
    this.messService.messageBox('Updated');

  }

  deleteWorkout(form:any){
    const db = getDatabase();
    remove(ref(db, 'workout/' + form.workoutName));
    this.getAllWorkout()
    this.messService.messageBox('Deleted');
  }

  searchTip(form:any){
    this.workout=[];
    const db = getDatabase();
    const tip = ref(db, 'workout/' + form.workoutName);
    onValue(tip, (snapshot) => {
      if(snapshot.val()){this.workout = [snapshot.val()]}     
    })
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

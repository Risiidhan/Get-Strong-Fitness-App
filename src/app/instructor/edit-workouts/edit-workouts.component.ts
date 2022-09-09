import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl, FormArray } from '@angular/forms';


@Component({
  selector: 'app-edit-workouts',
  templateUrl: './edit-workouts.component.html',
  styleUrls: ['./edit-workouts.component.css']
})
export class EditWorkoutsComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

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

  searchWorkoutForm = new FormGroup({
    workoutName: new FormControl(''),
  });

  editWorkoutForm = this.fb.group({
    title: ['',Validators.required],
    category: ['',Validators.required],
    targetMuscle: ['',Validators.required],
    shedule: this.fb.array([
      this.exFormGroup()
    ]),
  });
  

  ngOnInit(): void {
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


  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.editWorkoutForm.value);
    // alert(this.searchWorkoutForm.value.workoutName);
    let l = this.editWorkoutForm.value.shedule.length
    for(let i=0; i<l;i++){
      console.log(this.editWorkoutForm.value.shedule[i].exerciseName,this.editWorkoutForm.value.shedule[i].setAndReps)
    }
  }

  

}

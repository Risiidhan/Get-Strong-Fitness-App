import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-instructor',
  templateUrl: './edit-instructor.component.html',
  styleUrls: ['./edit-instructor.component.css']
})
export class EditInstructorComponent implements OnInit {

  constructor() { }

                                                  
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
  
  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-tips',
  templateUrl: './edit-tips.component.html',
  styleUrls: ['./edit-tips.component.css']
})
export class EditTipsComponent implements OnInit {

  constructor() { }

  tips = [
    {
      title:'Gain Weight',
      decription:' consectetur nam quod neque dolore, distinctio tempore.',
    },
    {
      title:'Hig Carbs',
      decription:' consectetur nam quod neque dolore, distinctio tempore.',
    },
    {
      title:'Hig Carbs',
      decription:' consectetur nam quod neque dolore, distinctio tempore.',
    },
    {
      title:'Hig Carbs',
      decription:' consectetur nam quod neque dolore, distinctio tempore.',
    },
    {
      title:'Hig Carbs',
      decription:' consectetur nam quod neque dolore, distinctio tempore.',
    }
  ];

  ngOnInit(): void {
  }

}

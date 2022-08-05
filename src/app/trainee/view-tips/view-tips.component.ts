import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-tips',
  templateUrl: './view-tips.component.html',
  styleUrls: ['./view-tips.component.css']
})
export class ViewTipsComponent implements OnInit {

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
  ]
  ngOnInit(): void {
  }

}

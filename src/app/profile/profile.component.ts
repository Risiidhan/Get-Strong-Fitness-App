import { Component, OnInit } from '@angular/core';
import { CalculateCaloriesService } from '../calculate-calories.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private calService:CalculateCaloriesService) { }

  username:string='';
  userType:string = '';

  ngOnInit(): void {
    this.getUser()
    this.setUserType()
  }

  setUserType(){
    this.userType = this.calService.getUserType();
  }

  getUser(){
    this.username = this.calService.getUsername();
  }

}

import { Component, OnInit } from '@angular/core';
import { CalculateCaloriesService } from '../calculate-calories.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  constructor(private route:Router ,private calService:CalculateCaloriesService) { }

  userType:string = '';

  ngOnInit(): void {
    this.userType = this.calService.getUserType();
  }

  moveToDashboard(){
    if(this.userType=='trainee'){
      this.route.navigate(['/dashboard'])
    }
    if(this.userType=='admin'){
      this.route.navigate(['/admin'])
    }
    if(this.userType=='instructor'){
      this.route.navigate(['/instructor'])
    }
  }

}

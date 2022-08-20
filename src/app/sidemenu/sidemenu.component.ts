import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  constructor(private route:Router ,private logService:LoginService) { }

  userType:string = '';

  ngOnInit(): void {
    this.userType = this.logService.getUserType();
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

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Router} from '@angular/router';
import { CalculateCaloriesService } from 'src/app/calculate-calories.service';
import { AdminDashboardComponent } from 'src/app/admin/dashboard/admin-dashboard.component';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  constructor(
    private route:Router,
    private Cservice:CalculateCaloriesService,
    public dialogRef: MatDialogRef<LoginModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

    username: string='';
    password:string='';

    admin=false;
    trainee=true;
    instructor=false;

    ngOnInit(): void {
    }

    switchUser(user:string){
      this.admin=false;
      this.trainee=false;
      this.instructor=false;

      if(user=='trainee'){
        this.trainee=true;
      }else if(user=='admin'){
        this.admin=true;
      }else{
        this.instructor=true;
      }
    }

    verifyLogin(): void {
      if(this.trainee){
        if(this.username=='rk'&& this.password=='123'){
          this.dialogRef.close();
          this.Cservice.setUsername(this.username);
          this.Cservice.setUserType('trainee')
          this.route.navigate(['/dashboard'])
          alert('You have Logged in Successfully!')
        }else{
          alert('Wrong username or password')
          this.username='';
          this.password='';
        }
      }
      if(this.admin){
        this.dialogRef.close();
        this.Cservice.setUserType('admin')
        this.Cservice.setUsername('Admin');
        alert('You have Logged in Successfully!')
        this.route.navigate(['/admin'])

      }
      if(this.instructor){
        this.dialogRef.close();
        this.Cservice.setUserType('instructor')
        this.Cservice.setUsername(this.username);
        alert('You have Logged in Successfully!')
        this.route.navigate(['/instructor'])
      }
    }

}

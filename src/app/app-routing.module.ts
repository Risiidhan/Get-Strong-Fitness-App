import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './trainee/dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin/dashboard/admin-dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import { EditCustComponent } from './admin/edit-cust/edit-cust.component';
import { EditInstructorComponent } from './admin/edit-instructor/edit-instructor.component';
import { ViewWorkoutsComponent } from './trainee/view-workouts/view-workouts.component';
import { InstructorDashboardComponent } from './instructor/instructor-dashboard/instructor-dashboard.component';
import { EditTipsComponent } from './instructor/edit-tips/edit-tips.component';
import { ViewTipsComponent } from './trainee/view-tips/view-tips.component';
import { EditRecipeComponent } from './instructor/edit-recipe/edit-recipe.component';
import { ViewRecipeComponent } from './trainee/view-recipe/view-recipe.component';
import { CusProfileComponent } from './trainee/cus-profile/cus-profile.component';


const routes: Routes = [
  {path:'',redirectTo:'home', pathMatch: 'full'},
  {path:'home',component:HomeComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'admin',component:AdminDashboardComponent},
  {path:'profile',component:ProfileComponent},
  {path:'edit-profile',component:CusProfileComponent},
  {path:'edit-customer',component:EditCustComponent},
  {path:'edit-instructor',component:EditInstructorComponent},
  {path:'workouts',component:ViewWorkoutsComponent},
  {path:'instructor',component:InstructorDashboardComponent},
  {path:'edit-tips',component:EditTipsComponent},
  {path:'tips',component:ViewTipsComponent},
  {path:'edit-recipe',component:EditRecipeComponent},
  {path:'recipe',component:ViewRecipeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

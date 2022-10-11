import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';

import { HomeComponent } from './home/home.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { WeightChartComponent } from './trainee/weight-chart/weight-chart.component';
import { CalorieChartComponent } from './trainee/calorie-chart/calorie-chart.component';
import { DashboardComponent } from './trainee/dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin/dashboard/admin-dashboard.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { ProfileComponent } from './profile/profile.component';
import { EditCustComponent } from './admin/edit-cust/edit-cust.component';
import { EditInstructorComponent } from './admin/edit-instructor/edit-instructor.component';
import { ViewWorkoutsComponent } from './trainee/view-workouts/view-workouts.component';
import { InstructorDashboardComponent } from './instructor/instructor-dashboard/instructor-dashboard.component';
import { EditTipsComponent } from './instructor/edit-tips/edit-tips.component';
import { ViewTipsComponent } from './trainee/view-tips/view-tips.component';
import { EditWorkoutsComponent } from './instructor/edit-workouts/edit-workouts.component';
import { EditRecipeComponent } from './instructor/edit-recipe/edit-recipe.component';
import { ViewRecipeComponent } from './trainee/view-recipe/view-recipe.component';
import { MessageModalComponent } from './modals/message-modal/message-modal.component';
import { ErrorMessageComponent } from './modals/error-message/error-message.component';
import { environment } from 'src/environments/environment';
import { CusProfileComponent } from './trainee/cus-profile/cus-profile.component';
import { ForgotPasswordComponent } from './modals/forgot-password/forgot-password.component';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './instructor/message/message.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { WorkoutReportComponent } from './trainee/workout-report/workout-report.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    SidemenuComponent,
    WeightChartComponent,
    CalorieChartComponent,
    AdminDashboardComponent,
    LoginModalComponent,
    ProfileComponent,
    EditCustComponent,
    EditInstructorComponent,
    ViewWorkoutsComponent,
    InstructorDashboardComponent,
    EditTipsComponent,
    ViewTipsComponent,
    EditWorkoutsComponent,
    EditRecipeComponent,
    ViewRecipeComponent,
    MessageModalComponent,
    ErrorMessageComponent,
    CusProfileComponent,
    ForgotPasswordComponent,
    ChatComponent,
    MessageComponent,
    ReportsComponent,
    WorkoutReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

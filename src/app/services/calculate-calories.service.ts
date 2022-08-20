import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculateCaloriesService {

  constructor(private http:HttpClient) { }

  userType:string='';
  username:string='';

  getCalories(food:string):Observable<any[]>{
    return this.http.get<any[]>(`https://calorieninjas.p.rapidapi.com/v1/nutrition/?rapidapi-key=403f4eb180msh436e2ffb7696945p198787jsne4da29317c79&query=${food}`);
  }

  setUsername(name:string){
    this.username=name;
  }
  getUsername(){
    return this.username;
  }  

  setUserType(type:string){
    this.userType=type;
  }

  getUserType(){
    return this.userType;
  }
}

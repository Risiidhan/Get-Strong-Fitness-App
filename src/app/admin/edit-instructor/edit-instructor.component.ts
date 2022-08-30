import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-edit-instructor',
  templateUrl: './edit-instructor.component.html',
  styleUrls: ['./edit-instructor.component.css']
})
export class EditInstructorComponent implements OnInit {

  instructors:any=[];
  data:any = [{}];

  constructor(private messService:MessageService, private server:ServerService) { }

  
  ngOnInit(): void {
    this.getAllData();
  }


  getSelectedInstructorToEdit(username:string){    
    this.data = this.server.getSelectedInstructorToEdit(username);   
    console.log(this.data);

  }

  addInstructor(form:any){
      this.server.addInstructor(form);
      this.getAllData();
      this.messService.messageBox('Inserted');
  }


  updateInstructor(form:any){
    this.server.updateInstructor(form);      
    this.messService.messageBox('Updated');
    this.getAllData();
  }


  getAllData(){
    this.instructors=[];
    this.server.getAllInstructor(this.instructors);
  }


  getInstructorDetails(form:any){
    this.instructors=[];
    let name =form.username
    this.server.getInstructorDetails(form.username,this.instructors)
  }

  removeInstructor(form:any){
    this.server.removeInstructor(form.username)
    this.messService.messageBox('Removed');
    this.getAllData();
  }


  removeInstructorFromTable(name:any){
    this.server.removeInstructor(name)
    this.messService.messageBox('Removed');
    this.getAllData();
  }
}

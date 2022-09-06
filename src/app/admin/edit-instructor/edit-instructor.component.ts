import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { ServerService } from 'src/app/services/server.service';
import { getDatabase, get, child, set, ref, onValue, update, remove} from "firebase/database";
import { AuthService } from 'src/app/services/auth.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';


@Component({
  selector: 'app-edit-instructor',
  templateUrl: './edit-instructor.component.html',
  styleUrls: ['./edit-instructor.component.css']
})
export class EditInstructorComponent implements OnInit {

  instructors:any=[];
  data:any = [{}];

  constructor(
    private messService:MessageService, 
    private auth:AuthService,
    private server:ServerService,
    private errorMessService: ErrorMessageService,) { }

  
  ngOnInit(): void {
    this.getAllData();
  }


  getSelectedInstructorToEdit(username:string){    
    this.data = this.server.getSelectedInstructorToEdit(username);   

  }

  addInstructor(form:any){
    const db = getDatabase();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0'
    var yyyy = today.getFullYear();

    let date = mm + '/' + dd + '/' + yyyy;

    const dbRef = ref(db)
    get(child(dbRef,'instructor/' + form.username))
    .then((snapshot)=>{
      if(snapshot.val()) return this.errorMessService.messageBox('This username already exists')
      this.auth.register(form.email,form.password,form.username)
      

      set(ref(db, 'instructor/' + form.username), {
        username: form.username,
        email: form.email,
        name: form.fullName,
        age : form.age,
        address: form.address,
        gender: form.gender,
        contact: form.contact,
        password: form.password,
        joinDate: date,
    });
  })
  this.getAllData();
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

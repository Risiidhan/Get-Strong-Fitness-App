import { Component, OnInit } from '@angular/core';
import { Trainee } from 'src/app/classes/trainee';
import { MessageService } from 'src/app/services/message.service';
import { ServerService } from 'src/app/services/server.service';
import { getDatabase, get, child, set, ref, onValue, update, remove} from "firebase/database";
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-edit-cust',
  templateUrl: './edit-cust.component.html',
  styleUrls: ['./edit-cust.component.css']
})
export class EditCustComponent implements OnInit {

  // customer=new Trainee()

  customer:any=[];
  data:any = [{}];

  constructor(
    private messService:MessageService, 
    private auth:AuthService,
    private server:ServerService,
    private errorMessService: ErrorMessageService,
    ) { }

  ngOnInit(): void {
    this.getAllData();
    
  }


  getSelectedCustomerToEdit(username:string){    
    this.data = this.server.getSelectedCustomerToEdit(username);       
  }

  
  addCustomer(form:any){
    const db = getDatabase();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0'
    var yyyy = today.getFullYear();

    let date = mm + '/' + dd + '/' + yyyy;

    const dbRef = ref(db)
    get(child(dbRef,'trainees/' + form.username))
    .then((snapshot)=>{
      if(snapshot.val()) return this.errorMessService.messageBox('This username already exists')
      this.auth.register(form.email,form.password,form.username)
      

      set(ref(db, 'trainees/' + form.username), {
        username: form.username,
        email: form.email,
        fullName: form.fullName,
        age : form.age,
        address: form.address,
        gender: form.gender,
        contact: form.contact,
        password: form.password,
        weight: form.weight,
        height: form.height,
        joinDate: date,
        exerciseLevel: form.exerciseLevel
    });
  })
  this.getAllData();
  }

  

  updateCustomer(form:any){
    this.server.updateCustomer(form);      
    this.messService.messageBox('Updated');
    this.getAllData();
  }


  getAllData(){
    this.customer=[];
    this.server.getAllCustomer(this.customer);
  }


  getCustomerDetails(form:any){
    this.customer=[];
    let name =form.username
    this.server.getCustomerDetails(form.username,this.customer)
  }

  removeCustomer(form:any){
    this.server.removeCustomer(form.username)
    this.messService.messageBox('Removed');
    this.getAllData();
  }


  removeCustomerFromTable(name:any){
    this.server.removeCustomer(name)
    this.messService.messageBox('Removed');
    this.getAllData();
  }
}

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { ServerService } from 'src/app/services/server.service';



@Component({
  selector: 'app-edit-cust',
  templateUrl: './edit-cust.component.html',
  styleUrls: ['./edit-cust.component.css']
})
export class EditCustComponent implements OnInit {

  customer:any=[];
  data:any = [{}];

  constructor(private messService:MessageService, private server:ServerService) { }

  ngOnInit(): void {
    this.getAllData();
  }


  getSelectedCustomerToEdit(username:string){
    this.data = this.server.getSelectedCustomerToEdit(username);    
  }

  addCustomer(form:any){
      this.server.addCustomer(form);
      this.getAllData();
      this.messService.messageBox('Inserted');
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

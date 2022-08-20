import { Injectable } from '@angular/core';
import { getDatabase, set, ref, onValue, update, remove} from "firebase/database"
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  adminInfo:any;
  selectedCustomerToEdit:any;
  db = getDatabase();

  constructor() { }

  // customer services start
  getAllCustomer(arrayName:any){
    const dbRef = ref(this.db, 'trainees/');
    
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        arrayName.push(childSnapshot.val());        
      });
    }, {
      onlyOnce: true
    });
  }

  getCustomerDetails(username:string, arrayName:any){
    const customerDetails = ref(this.db, 'trainees/' + username);
    onValue(customerDetails, (snapshot) => arrayName.push(snapshot.val()))
  }

  addCustomer(form:any){
    set(ref(this.db, 'trainees/' + form.username), {
      username: form.username,
      fullName: form.fullName,
      age : form.age,
      address: form.address,
      gender: form.gender,
      contact: form.contact,
      password: form.password,
      weight: form.weight,
      height: form.height,
      exerciseLevel: form.exerciseLevel
    });
  }

  updateCustomer(form:any){
    update(ref(this.db, 'trainees/' + form.username), {
      fullName: form.fullName,
      age : form.age,
      address: form.address,
      gender: form.gender,
      contact: form.contact,
      weight: form.weight,
      height: form.height,
      exerciseLevel: form.exerciseLevel
    });
  }

  removeCustomer(name:any){
    remove(ref(this.db, 'trainees/' + name));
  }

  getSelectedCustomerToEdit(username:string){
    const customerDetails = ref(this.db, 'trainees/' + username);
    onValue(customerDetails, (snapshot) => this.selectedCustomerToEdit = [snapshot.val()])
    return this.selectedCustomerToEdit;
    
  }
  // customer service ends


  // profile for admin starts
   getAdminDetails(){
    const adminDetails = ref(this.db, 'admin/' + 'admin');
    onValue(adminDetails, (snapshot) => this.adminInfo = [snapshot.val()])
    console.log(this.adminInfo + ' admin/ in service' );
  }  

  updateAdminDetails(form:any){
    update(ref(this.db, 'admin/' + 'admin'), {
      name: form.name,
      age: form.age,
      address : form.address,
      gender : form.gender,
      contact:form.contact
    });
  }

  // profile for admin ends


}

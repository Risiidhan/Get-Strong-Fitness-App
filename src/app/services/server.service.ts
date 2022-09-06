import { Injectable } from '@angular/core';
import { getDatabase, get, child, set, ref, onValue, update, remove} from "firebase/database"
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { Observable } from 'rxjs';
import { Instructor } from '../classes/instructor';
import { Trainee } from '../classes/trainee';




@Injectable({
  providedIn: 'root'
})
export class ServerService {

  

  adminInfo:any;
  selectedCustomerToEdit:any;
  selectedInstructorToEdit:any;
  db = getDatabase();

  constructor(private errorMessService: ErrorMessageService) { }

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
    let customerDetail;
    const customerDetails = ref(this.db, 'trainees/' + username);
    onValue(customerDetails, (snapshot) => {
      this.selectedCustomerToEdit = [snapshot.val()]
      customerDetail = new Trainee(
        this.selectedCustomerToEdit[0].username,
        this.selectedCustomerToEdit[0].email,
        this.selectedCustomerToEdit[0].fullName,
        this.selectedCustomerToEdit[0].gender,
        this.selectedCustomerToEdit[0].age,
        this.selectedCustomerToEdit[0].address,
        this.selectedCustomerToEdit[0].contact,
        this.selectedCustomerToEdit[0].password,
        this.selectedCustomerToEdit[0].height,
        this.selectedCustomerToEdit[0].weight,
        this.selectedCustomerToEdit[0].exerciseLevel
        )
    }

    )
      
    return [customerDetail];
    
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

  // instructor service starts
 

  getInstructorsCount(){ 
    let count=0;
    const dbRef = ref(this.db, 'instructor/');
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        count+=1       
      });
    }, {
      onlyOnce: true
    });
    return count
  }


  getSelectedInstructorToEdit(username:string){
    let instructorDetail;
    const instructor = ref(this.db, 'instructor/' + username);
    onValue(instructor, (snapshot) => {
      this.selectedInstructorToEdit = [snapshot.val()]
      instructorDetail = new Instructor(
        this.selectedInstructorToEdit[0].username,
        this.selectedInstructorToEdit[0].email,
        this.selectedInstructorToEdit[0].name,
        this.selectedInstructorToEdit[0].gender,
        this.selectedInstructorToEdit[0].age,
        this.selectedInstructorToEdit[0].address,
        this.selectedInstructorToEdit[0].contact,
        this.selectedInstructorToEdit[0].password,
      )
    }

    )
      console.log(instructorDetail);
      
    return [instructorDetail];
    
  }
  
  removeInstructor(name:any){
    remove(ref(this.db, 'instructor/' + name));
  }

  getAllInstructor(arrayName:any){
    const dbRef = ref(this.db, 'instructor/');
    
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        arrayName.push(childSnapshot.val());        
      });
    }, {
      onlyOnce: true
    });
  }

  
  updateInstructor(form:any){
    update(ref(this.db, 'instructor/' + form.username), {
      fullName: form.fullName,
      age : form.age,
      address: form.address,
      gender: form.gender,
      contact: form.contact,
      password: form.password
    });
  }

  getInstructorDetails(username:string, arrayName:any){
    const customerDetails = ref(this.db, 'instructor/' + username);
    onValue(customerDetails, (snapshot) => arrayName.push(snapshot.val()))
  }

  // instructors service ends

}

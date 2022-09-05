import { Component, OnInit } from '@angular/core';
import { getDatabase, get, child, set, ref, onValue, update, remove} from "firebase/database"
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  constructor(
    private messService:MessageService,
    private errorMessService:ErrorMessageService) { }

  data:any = [{}];
  recipes:any=[{}]
  

  ngOnInit(): void {
    this.getAllFoods()
  }

  addFood(form:any){
    const db = getDatabase();

    //check if food already exists
    const dbRef = ref(db)
    get(child(dbRef,'food/' + form.title))
    .then((snapshot)=>{
      if(snapshot.val()) return this.errorMessService.messageBox('This food already exists')

      set(ref(db, 'food/' + form.title), {
        title: form.title,
        macroNutrients:form.macroNutrients,
        imageLink: form.imageLink.toString(),
        ingridents : form.ingridents,
      });
      this.getAllFoods()
      this.messService.messageBox('Inserted')
    })
  }


  onEdit(title:any){
    this.data=[];
    const db = getDatabase();
    const instructor = ref(db, 'food/' + title);
    onValue(instructor, (snapshot) => {
      if(snapshot.val()){
        this.data = [snapshot.val()] 
      } 

    })
  }


  updateFood(form:any){
    const db = getDatabase();
    update(ref(db, 'food/' + form.title), {
      macroNutrients:form.macroNutrients,
      imageLink: form.imageLink,
      ingridents : form.ingridents,
    });
    this.getAllFoods()
    this.messService.messageBox('Updated');

  }

  searchFood(form:any){
    this.recipes=[];
    const db = getDatabase();
    const instructor = ref(db, 'food/' + form.foodName);
    onValue(instructor, (snapshot) => {
      if(snapshot.val()){
        this.recipes = [snapshot.val()] 
      } 

    })
  }

  deleteFood(title:any){
    const db = getDatabase();
    remove(ref(db, 'food/' + title));
    this.getAllFoods()
    this.messService.messageBox('Deleted');
  }
  

  getAllFoods(){
    this.recipes=[];
    const db = getDatabase();
    const dbRef = ref(db, 'food/');
    
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        this.recipes.push(childSnapshot.val());    
            
      });
    }, {
      onlyOnce: true
    });    
  }
}

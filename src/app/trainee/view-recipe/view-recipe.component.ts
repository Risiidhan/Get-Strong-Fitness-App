import { Component, OnInit } from '@angular/core';
import { getDatabase, get, child, set, ref, onValue, update, remove} from "firebase/database"


@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {

  constructor() { }

  recipes:any=[{}]



  ngOnInit(): void {
    this.getAllFoods()

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

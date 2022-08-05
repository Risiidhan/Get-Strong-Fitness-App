import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  constructor() { }

  recipes=[
    {
      name:'Food Name',
      items:'Food Items, abc, efg, hit',
      description:' praesentium. Vero, modi impedit, non aut, minima odit quam porro labore fuga quo quasi. Dolorum.',
    },
    {
      name:'Food Name',
      items:'Food Items, abc, efg, hit',
      description:' praesentium. Vero, modi impedit, non aut, minima odit quam porro labore fuga quo quasi. Dolorum.',
    },
    {
      name:'Food Name',
      items:'Food Items, abc, efg, hit',
      description:' praesentium. Vero, modi impedit, non aut, minima odit quam porro labore fuga quo quasi. Dolorum.',
    },
    {
      name:'Food Name',
      items:'Food Items, abc, efg, hit',
      description:' praesentium. Vero, modi impedit, non aut, minima odit quam porro labore fuga quo quasi. Dolorum.',
    }
  ]
  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

import { RecipeModel } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  recipe: RecipeModel;

  constructor() { }

  ngOnInit() {
    console.log('');
  }

}

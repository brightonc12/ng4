import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeModel } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: [ './recipe-list.component.css' ]
} )
export class RecipeListComponent implements OnInit, OnDestroy {

  recipeSubscription: Subscription;
  recipes: RecipeModel[];

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.recipeSubscription = this.recipeService.recipeChanged.subscribe(
      (recipes: RecipeModel[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }

}

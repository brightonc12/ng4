import { RecipeModel } from './recipe.model';
import { Injectable } from '@angular/core';
import { IngredientModel } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  private recipes: RecipeModel[] = [
    new RecipeModel(
      'A test',
      'this is just a test',
      'https://images.unsplash.com/' +
      'photo-1540660290370-8aa90e451e8a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      [
        new IngredientModel('Meat', 2),
        new IngredientModel('French Fries', 10)
      ]
    ),

    new RecipeModel(
      'Another one',
      'this is  a test',
      'https://images.unsplash.com/photo-1488558980948-81db7f6c239c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyM' +
      'Dd9&auto=format&fit=crop&w=500&q=60',
      [
        new IngredientModel('Buns', 2),
        new IngredientModel('meat', 4)
      ]
    ),

    new RecipeModel(
      'This is the third test',
      'this is just a test 3',
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=' +
      'format&fit=crop&w=500&q=60',
      [
        new IngredientModel('cheese', 4),
        new IngredientModel('vegetables', 4)
      ]
    )
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number): RecipeModel {
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: IngredientModel[]) {
    this.slService.addIngredients(ingredients);
  }
}

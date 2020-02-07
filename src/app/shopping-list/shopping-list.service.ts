import { IngredientModel } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {

  ingredientChanged = new EventEmitter<IngredientModel[]>();

  private ingredients: IngredientModel[] = [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: IngredientModel) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: IngredientModel[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.emit(this.ingredients.slice());
  }
}

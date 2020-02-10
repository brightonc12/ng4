import { Subject } from 'rxjs';

import { IngredientModel } from '../shared/ingredient.model';

export class ShoppingListService {

  ingredientChanged = new Subject<IngredientModel[]>();

  private ingredients: IngredientModel[] = [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: IngredientModel) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: IngredientModel[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}

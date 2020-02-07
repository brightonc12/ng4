import { IngredientModel } from '../shared/ingredient.model';

export class RecipeModel {

  constructor(
    public name: string,
    public description: string,
    public image: string,
    public ingredients: IngredientModel[]
  ) {}
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IngredientModel } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: IngredientModel[];
  private igChangedSubscription: Subscription

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangedSubscription = this.shoppingListService.ingredientChanged.subscribe(
      (ingredients: IngredientModel[]) => {
        this.ingredients = this.shoppingListService.getIngredients();
      }
    );
  }

  ngOnDestroy(): void {
    this.igChangedSubscription.unsubscribe();
  }

}

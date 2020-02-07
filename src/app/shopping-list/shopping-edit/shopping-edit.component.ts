import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IngredientModel } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: true}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInputRef: ElementRef;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem() {
    const ingredient = new IngredientModel(
      this.nameInputRef.nativeElement.value,
      this.amountInputRef.nativeElement.value
    );

    this.slService.addIngredient(ingredient);
  }

}

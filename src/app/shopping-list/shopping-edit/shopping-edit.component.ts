import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IngredientModel } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: [ './shopping-edit.component.css' ]
} )
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild( 'f', { static: false } ) slForm: NgForm;

  onEditSubscription: Subscription;
  editIndex: number;
  editMode = false;
  editableItem: IngredientModel;

  constructor( private slService: ShoppingListService ) {
  }

  ngOnInit() {
    this.initOnEditItem();
  }

  onSubmitItem( form: NgForm ) {
    const value = form.value;
    const ingredient = new IngredientModel( value.name, value.amount );

    if ( this.editMode ) {
      this.slService.updateIngredient( this.editIndex, ingredient );
    } else {
      this.slService.addIngredient( ingredient );
    }

    this.onClear();
  }

  onDeleteItem() {
    if (this.editMode ) {
      this.slService.deleteIngredient(this.editIndex);
      this.onClear();
    }
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  initOnEditItem() {
    this.onEditSubscription = this.slService.startEditingItem.subscribe(
      ( index: number ) => {
        this.editMode = true;
        this.editIndex = index;
        this.editableItem = this.slService.getIngredient( index );
        this.slForm.setValue( {
          name: this.editableItem.name,
          amount: this.editableItem.amount
        } );
      }
    );
  }

  ngOnDestroy(): void {
    this.onEditSubscription.unsubscribe();
  }
}

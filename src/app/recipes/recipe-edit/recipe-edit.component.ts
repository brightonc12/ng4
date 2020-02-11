import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';

@Component( {
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: [ './recipe-edit.component.css' ]
} )
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      ( params: Params ) => {
        this.id = params.id;
        this.editMode = params.id != null;
        this.initForm();
      }
    );
  }

  initForm() {
    let name = '';
    let imagePath = '';
    let description = '';
    const ingredients = new FormArray( [] );

    if ( this.editMode ) {
      const recipe = this.recipeService.getRecipe( this.id );
      name = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;

      if ( recipe.ingredients ) {
        recipe.ingredients.forEach( ing => {
            ingredients.push(
              new FormGroup( {
                name: new FormControl( ing.name, [Validators.required]),
                amount: new FormControl( ing.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)] )
              } )
            );
          }
        );
      }
    }

    this.recipeForm = new FormGroup( {
      name: new FormControl( name, [Validators.required] ),
      imagePath: new FormControl( imagePath, [Validators.required] ),
      description: new FormControl( description, [Validators.required] ),
      ingredients
    } );
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, [Validators.required]),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }
}

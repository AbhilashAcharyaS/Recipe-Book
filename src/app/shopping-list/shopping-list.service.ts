import { EventEmitter } from '@angular/core';
import { Ingredients } from '../Shared/ingredient.model';

export class ShoppingListService {

  ingredientChanged = new EventEmitter<Ingredients[]>();  
  private ingredients: Ingredients[] = [
    new Ingredients('Apple', 5),
    new Ingredients('Tomato', 10),
  ];

  getIngredient() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient:Ingredients) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients:Ingredients[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.emit(this.ingredients.slice());
  } 

}

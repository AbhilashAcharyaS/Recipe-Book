import { Subject } from 'rxjs';
import { Ingredients } from '../Shared/ingredient.model';

export class ShoppingListService {

  ingredientChanged = new Subject<Ingredients[]>();  
  private ingredients: Ingredients[] = [
    new Ingredients('Apple', 5),
    new Ingredients('Tomato', 10),
  ];

  getIngredient() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient:Ingredients) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients:Ingredients[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  } 

}

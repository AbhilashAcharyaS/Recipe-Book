import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../Shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
//   private recipes: Recipe[] = [
//     new Recipe(
//       'test',
//       'test desc',
//       'https://cdn.pixabay.com/photo/2015/06/01/23/43/pasta-794464_1280.jpg',
//       [new Ingredient('meat', 1), new Ingredient('French fries', 10)]
//     ),
//     new Recipe(
//       'test2',
//       'test desc2',
//       'https://cdn.pixabay.com/photo/2015/06/01/23/43/pasta-794464_1280.jpg',
//       [new Ingredient('meat', 5), new Ingredient('French fries', 2)]
//     ),
//   ];

  private recipes:Recipe[]= [];

  constructor(private slSer: ShoppingListService) {}

  setRecipes(recipes:Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice())
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ings: Ingredient[]) {
    this.slSer.addIngredients(ings);
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}

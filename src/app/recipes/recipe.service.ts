import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredients } from '../Shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    
    private recipes: Recipe[] = [
        new Recipe(
         'test',
         'test desc',
         'https://cdn.pixabay.com/photo/2015/06/01/23/43/pasta-794464_1280.jpg',
         [ new Ingredients('meat',1),
            new Ingredients('French fries',10)
         ]
        ),
        new Recipe(
            'test2',
            'test desc2',
            'https://cdn.pixabay.com/photo/2015/06/01/23/43/pasta-794464_1280.jpg',
            [ new Ingredients('meat',5),
                new Ingredients('French fries',2)
             ]
           )
     ];

     constructor(private slSer:ShoppingListService){}

     getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index:number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ings:Ingredients[]){
        this.slSer.addIngredients(ings);
    }
}

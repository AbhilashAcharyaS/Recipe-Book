import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredients } from '../Shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    
    recipeSelected= new EventEmitter<Recipe>();

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

     getRecipe() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ings:Ingredients[]){
        this.slSer.addIngredients(ings);
    }
}

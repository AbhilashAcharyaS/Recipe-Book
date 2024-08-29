import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {

  recipes:Recipe[]=[
    new Recipe("test",'test desc','https://cdn.pixabay.com/photo/2015/06/01/23/43/pasta-794464_1280.jpg')
  ];

}

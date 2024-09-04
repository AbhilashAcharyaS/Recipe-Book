import { ShoppingListService } from './shopping-list.service';
import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../Shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit{

  ingredients:Ingredients[]=[];

  constructor(private shoppingListService:ShoppingListService){}

  ngOnInit(): void {
    this.ingredients=this.shoppingListService.getIngredient();
    this.shoppingListService.ingredientChanged.subscribe(
      (ingredients:Ingredients[])=>{
        this.ingredients=ingredients;
      }
    )
  }
  
}

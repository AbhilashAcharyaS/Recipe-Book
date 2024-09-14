import { ShoppingListService } from './shopping-list.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredients } from '../Shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  ingredients:Ingredients[]=[];
  igChangedSub:Subscription;

  constructor(private shoppingListService:ShoppingListService){}

  ngOnInit(): void {
    this.ingredients=this.shoppingListService.getIngredients();
    this.igChangedSub=this.shoppingListService.ingredientChanged.subscribe(
      (ingredients:Ingredients[])=>{
        this.ingredients=ingredients;
      }
    )
  }

  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index)
  }

  ngOnDestroy(): void {
    this.igChangedSub.unsubscribe();
  }
  
}

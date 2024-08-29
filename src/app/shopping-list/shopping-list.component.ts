import { Component } from '@angular/core';
import { Ingredients } from '../Shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {

  ingredients:Ingredients[]=[
    new Ingredients('Apple',5),
    new Ingredients("Tomato",10)
  ];
}

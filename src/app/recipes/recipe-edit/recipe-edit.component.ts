import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit{
  id:number;
  editMode= false;
  recipeForm:FormGroup

  constructor(private route:ActivatedRoute, private recipeService:RecipeService){}
  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id= +params['id'];
        this.editMode= params['id'] != null;
        this.initForm();        
      }
    )
  }

  private initForm(){
    let recipeName="";
    let recipeImg="";
    let recipeDesc="";
    let recipeIngredients= new FormArray([]);

    if(this.editMode){
      const recipe= this.recipeService.getRecipe(this.id);
      recipeName= recipe.name;
      recipeImg= recipe.imagePath;
      recipeDesc= recipe.description;
      
      if(recipe['ingredients']){
        for(let ing of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name':new FormControl(ing.name),
              'amount': new FormControl(ing.amount)
            })
          )
        }
      }
    }
    this.recipeForm= new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImg),
      'description': new FormControl(recipeDesc),
      'ingredients': recipeIngredients
    })
  }

  get controls() { // a getter!
  return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit(){
    console.log(this.recipeForm);  
  }

  onAddIngredient(){
    
  }
}

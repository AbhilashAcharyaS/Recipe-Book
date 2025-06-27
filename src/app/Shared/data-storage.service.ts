import { AuthService } from './../auth/auth.service';
import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs/operators";

@Injectable({providedIn:"root"})

export class DataStorageService{
    constructor(private http:HttpClient, private recipeService:RecipeService, private authService:AuthService){}

    storeRecipes(){
        const recipes= this.recipeService.getRecipes();
        this.http.put('https://recipe-book-11c8e-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe(res=>{console.log(res)});
    }

    fetchRecipes(){
        return this.authService.user.pipe(take(1), exhaustMap(user=>{
            return this.http.get<Recipe[]>('https://recipe-book-11c8e-default-rtdb.firebaseio.com/recipes.json', {
                params:new HttpParams().set('auth', user.token)
            })
        }),
        map(res=>{return res.map(r=>{return {...r, ingredients:r.ingredients?r.ingredients:[]}})}),
        tap(recipes=>{this.recipeService.setRecipes(recipes)})       
    )
    }
}
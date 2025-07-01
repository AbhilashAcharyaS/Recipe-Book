import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http"

import { AppComponent } from './app.component';
import { headerComponent} from './header/header.component';
import { DropdownDirective } from './Shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './Shared/loading-spinner/loading-spinner.component';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { AlertComponent } from './Shared/alert/alert.component';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

@NgModule({
  declarations: [
    AppComponent,
    headerComponent,
    DropdownDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule
  ],
  providers: [ShoppingListService, RecipeService, {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

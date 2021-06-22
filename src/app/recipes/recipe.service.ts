import { Recipe } from './recipe.model';
import {  Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
  // recipes: Recipe[] = [
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel-just awesome!',
  //   'http://www.twochums.com/wp-content/uploads/2018/01/IMG_4187-1-e1516844933437.jpg',
  //   [
  //     new Ingredient('Meat', 1),
  //     new Ingredient('Pasta', 1),
  //     new Ingredient('Lemon', 1)
  //   ]),
  //   new Recipe(
  //     'Big fat Burger',
  //     'What else you need to say?',
  //   'https://cdn-image.foodandwine.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/red-robin-burger-pass-ft-blog1117.jpg?itok=Na0Jcedn',
  //   [
  //     new Ingredient('Burns', 1),
  //     new Ingredient('Meat', 2),
  //     new Ingredient('French fries', 20)
  //   ])
  // ];

  constructor(private slService: ShoppingListService){}

  setRecipes(new_recipes: Recipe[]){
    this.recipes = new_recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(){
    return this.recipes.slice();
  }

  getRecipeID(index: number){
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredientToRecipe(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());

  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}

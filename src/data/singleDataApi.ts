/*
This is the file where an API call is made to Spoonacular using an id from clicked on recipe.
It creates a complete recipe to be displayed.
*/

import { Recipe } from '../models/recipe';
import { Ingredients } from '../models/ingredient';

export const getSingleRecipeData = async (id: string | null, recipes: Recipe[]) => {
    
    const response = await Promise.all([ //makes a GET call to the API using a recipe id
        fetch("https://api.spoonacular.com/recipes/" + id + "/information?apiKey=69bb5d86816f4ef2b9957ce81059a8a9",{
            "method": "GET" 
        })
    ]);
    
    const result = await response[0].json(); // creates a usable constant, result,  to hold the recipe that returns as a json
    
    var recipeIndex: any = recipes.findIndex(elem => elem.id === id); // finds recipe that exists in order to update the recipe
        if (typeof recipeIndex === "undefined"){
            alert('undefined');}
    console.log("this is the recipe" + recipeIndex);
   
    
    function IngredientsFind(){    var Ingredients: Ingredients[] = []; // loops through ingredients to obtain the name and amount of each, stores them in list
        for ( let i = 0; i < result.extendedIngredients.length ; i++){
            Ingredients.push({
            name: result.extendedIngredients[i].name,
            amount: result.extendedIngredients[i].original
        } as Ingredients)
    ;}
return Ingredients};
        
    // updating empty variables to clicked recipes info
    recipes[recipeIndex].ingredients = IngredientsFind();
    recipes[recipeIndex].summary = result.summary;
    recipes[recipeIndex].instructions = result.instructions;
  
    const data = {
        recipes
    }
    return data;
}
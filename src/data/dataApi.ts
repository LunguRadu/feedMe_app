/*
This is the file where an API call is made to Spoonacular using ingredients from a list.
It creates a list of recipes to return and be displayed.
*/

import { Recipe } from '../models/recipe';

export const getRecipeData = async (ingredients: string | null) => { //makes a GET call to the API using ingredients
    const response = await Promise.all([
        fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=15&ranking=1&ignorePantry=false&ingredients="+ ingredients, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key": "03b2dd72camsh3d3fc675eaafd7bp13f7d4jsn44d5a3f51cd4"
            }
        })
    ]);
    const result = await response[0].json(); // creates a usable constant, result,  to hold the recipe that returns as a json

    console.log('Found ' + result.count + ' recipes!'); // *console prints for testing*
    console.log('Here they are: ' + result);
    console.log(result);

    var recipes: Recipe[] = [];
    result.forEach(function (item: any) {//loop to update the recipes shown in Listview to API results
   
    var recipe: Recipe = {
        title: item.title,
        image: item.image,
        id: String(item.id),
        usedIngredientCount: item.usedIngredientCount,
        hasIngredients: false, 
        ingredients: [], // sets as empty list  or sting (following variables) to hold place until the rest of the recipe is filled in with singleDataApi
        instructions: "", 
        summary: ""
    }
    recipes.push(recipe);// add induvidual recipe to recipes to be 'drawn'
    });
    const data = {
        recipes
    }
    return data;
}

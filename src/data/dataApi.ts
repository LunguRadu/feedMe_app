import { Plugins } from '@capacitor/core';
import { Recipe, Ingredients } from '../models/recipe';


export const getRecipeData = async (ingredients: string | null) => {
    const response = await Promise.all([
        fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=15&ranking=1&ignorePantry=false&ingredients="+ ingredients, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key": "03b2dd72camsh3d3fc675eaafd7bp13f7d4jsn44d5a3f51cd4"
            }
        })
    ]);
    const result = await response[0].json();

    console.log('Found ' + result.count + ' recipes!');
    console.log('Here they are: ' + result);
    console.log(result);

    var recipes: Recipe[] = [];
    result.forEach(function (item: any) {//loop to update the recipes shown in Listview to API results
   
    var recipe: Recipe = {
        title: item.title,
        image: item.image,
        id: item.id,
        usedIngredientCount: item.usedIngredientCount,
        hasIngredients: false,
        ingredients: [],
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


  export const getSingleRecipeData = async (id: string | null, recipes: Recipe[]) => {

    const response = await Promise.all([
        fetch("https://api.spoonacular.com/recipes/" + id + "/information?apiKey=69bb5d86816f4ef2b9957ce81059a8a9",{
            "method": "GET"
        })
    ]);
    const result = await response[0].json();
    
    var recipe: Recipe = recipes.find(elem => elem.id === id) as Recipe;
        if (typeof recipe === "undefined"){
            alert('undefined');
        }

    console.log(result);
    var Ingredients: Ingredients[] = [];
    result.ingredients.forEach(function () {
        Ingredients.push({
        name: result.extendedIngredients.name,
        amount: result.extendedIngredients.original
        } as Ingredients)
    });
        
    recipe.ingredients = Ingredients;
    recipe.summary = result.summary;
    recipe.instructions = result.instructions;
    recipes.push(recipe);
  
    const data = {
        recipes
    }
    return data;
}
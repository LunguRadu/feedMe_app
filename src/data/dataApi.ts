import { Plugins } from '@capacitor/core';
import { Recipe, Ingredients } from '../models/recipe';


export const getRecipeData = async (ingredients: string | null) => {
    const response = await Promise.all([
        fetch("https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + ingredients + "&number=10&apiKey=69bb5d86816f4ef2b9957ce81059a8a9",{
            "method": "GET"
        })
    ]);
    const result = await response[0].json();

    console.log('Found ' + result.count + ' recipes!');
    console.log('Here they are: ' + result);
    console.log(result);
    var Ingredients: Ingredients[] = [];
    result.ingredients.forEach(function (ingredient: any) {
        Ingredients.push({
        name: 'null',
        amount: 'null'
        } as Ingredients)
    });

    var recipes: Recipe[] = [];
    result.forEach(function (item: any) {//loop to update the recipes shown in Listview to API results
   
    var recipe: Recipe = {
        title: item.title,
        image: item.image,
        id: item.id,// use URL as ID because each is unique
        usedIngredientCount: item.usedIngredientCount,
        summary: 'null',
        ingredients: Ingredients,

        instructions: 'null'
    }
    recipes.push(recipe);// add induvidual recipe to recipes to be 'drawn'
    });
    const data = {
        recipes
    }
    return data;
}

export const getDummyData = async () => {
    console.log("getting dummy data");
    const response = await Promise.all([
      fetch('/assets/data/dummydata.json')
    ]);
    const responseData = await response[0].json();
    var Ingredients: Ingredients[] = [];
    responseData.ingredients.forEach(function (ingredient: any) {
        Ingredients.push({
        name: 'null',
        amount: 'null'
        } as Ingredients)
    });

    var recipes: Recipe[] = [];
    responseData.forEach(function (item: any) {//loop to update the recipes shown in Listview to API results
   
    var recipe: Recipe = {
        title: item.title,
        image: item.image,
        id: item.id,// use URL as ID because each is unique
        usedIngredientCount: item.usedIngredientCount,
        summary: 'null',
        ingredients: Ingredients,
        instructions: 'null'

    }
    recipes.push(recipe);// add induvidual recipe to recipes to be 'drawn'
    });

    const dummyData = {
        "recipes": recipes,
        "loading": false,
        "searchText": "dummy"
    }
    return dummyData;
  }

  export const getSingleRecipeData = async (id: string | null, recipe : Recipe) => {
    const response = await Promise.all([
        fetch("https://api.spoonacular.com/recipes/" + id + "/information&apiKey=69bb5d86816f4ef2b9957ce81059a8a9",{
            "method": "GET"
        })
    ]);
    const result = await response[0].json();

    console.log(result);
    var Ingredients: Ingredients[] = [];
    result.ingredients.forEach(function (ingredient: any) {
        Ingredients.push({
        name: result.extendedIngredients.name,
        amount: result.extendedIngredients.original
        } as Ingredients)
    });
    recipe.ingredients = Ingredients;
    recipe.summary = result.summary;
    recipe.instructions = result.instructions;

    const data = {
        recipe
    }
    return data;
}
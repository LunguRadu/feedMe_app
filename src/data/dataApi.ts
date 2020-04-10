import { Plugins } from '@capacitor/core';
import { Recipe } from '../models/recipe';
import { Ingredient} from '../models/ingredient';


export const getRecipeData = async (ingredients: string | null) => {
    const response = await Promise.all([
        fetch('https://api.edamam.com/search?q=' + ingredients + '&app_id=12ef1ccd&app_key=c38b84d50a0fb09c60c7f64af6853958')
    ]);
    const result = await response[0].json();

    console.log('Found ' + result.count + ' recipes!');
    console.log('Here they are: ' + result.hits);
    console.log(result);

    var recipes: Recipe[] = [];

    result.hits.forEach(function (hit: any) {//loop to update the recipes shown in Listview to API results
    var hitIngredients: Ingredient[] = [];
    hit.recipe.ingredients.forEach(function (ingredient: any) {
        hitIngredients.push({
        text: hit.recipe.ingredients.text,
        weight: hit.recipe.ingredients.weight
        } as Ingredient)
    });
    var recipe: Recipe = {
        name: hit.recipe.label,
        image: hit.recipe.image,
        id: hit.recipe.uri,// use URL as ID because each is unique
        ingredientsLines: hit.recipe.ingredientLines,
        ingredients: hitIngredients,
        instructions: hit.recipe.url
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

    var recipes: Recipe[] = [];

    responseData.recipes.forEach(function (hit: any) {//loop to update the recipes shown in Listview to API results
    var hitIngredients: Ingredient[] = [];
    hit.ingredients.forEach(function (ingredient: any) {
        hitIngredients.push({
        text: hit.ingredients.text,
        weight: hit.ingredients.weight
        } as Ingredient)
    });
    var recipe: Recipe = {
        name: hit.label,
        image: hit.image,
        id: hit.id,
        ingredientsLines: "test",
        ingredients: hitIngredients,
        instructions: hit.url
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
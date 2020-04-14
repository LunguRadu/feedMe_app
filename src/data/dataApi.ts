import { Plugins } from '@capacitor/core';
import { Recipe } from '../models/recipe';


export const getRecipeData = async (ingredients: string | null) => {
    const response = await Promise.all([
        fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=apples%252Cflour%252Csugar", {
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
        
    }
    recipes.push(recipe);// add induvidual recipe to recipes to be 'drawn'
    });

    const data = {
        recipes
    }
    return data;
}

// export const getDummyData = async () => {
//     console.log("getting dummy data");
//     const response = await Promise.all([
//       fetch('/assets/data/dummydata.json')
//     ]);
//     const responseData = await response[0].json();

//     var recipes: Recipe[] = [];

//     responseData.recipes.forEach(function (item: any) {//loop to update the recipes shown in Listview to API results
//     // var hitIngredients: Ingredient[] = [];
//     // hit.ingredients.forEach(function (ingredient: any) {
//     //     hitIngredients.push({
//     //     text: hit.ingredients.text,
//     //     weight: hit.ingredients.weight
//     //     } as Ingredient)
//     // });
//     var recipe: Recipe = {
//         title: item.title,
//         image: item.image,
//         id: item.id,// use URL as ID because each is unique
//         usedIngredientCount: item.usedIngredientCount,
//         // ingredients: itemIngredients,
//         // instructions: item.recipe.url
//     }
//     recipes.push(recipe);// add induvidual recipe to recipes to be 'drawn'
//     });

//     const dummyData = {
//         "recipes": recipes,
//         "loading": false,
//         "searchText": "dummy"
//     }
//     return dummyData;
//   }
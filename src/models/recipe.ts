import {Ingredient} from './ingredient';

export interface Recipe {
  // Fields in result
  name: string;
  image: URL;
  id: string;
  ingredientsLines: string;
  ingredients: Ingredient[];
  instructions: URL;
}

// export const getRecipes = () => recipes; // get all recipes


// export const getRecipe = (id: string) => recipes.find(m => m.id === id); //get one recipe (by id)

// export function setRecipes(newRecipes: Recipe[]){ //Reset recipes to a new list
//   recipes = newRecipes;
// }

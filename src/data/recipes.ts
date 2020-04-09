export interface Ingredient{
  text: string;
  weight: string;
}
export interface Recipe {
  // Fields in result
  name: string;
  image: URL;
  id: string;
  ingredientsLines: string;
  ingredients: Ingredient[];
  instructions: URL;
}

var recipes: Recipe[] = [];

export const getRecipes = () => recipes; // get all recipes


export const getRecipe = (id: string) => recipes.find(m => m.id === id); //get one recipe (by id)

export function setRecipes(newRecipes: Recipe[]){ //Reset recipes to a new list
  recipes = newRecipes;
}

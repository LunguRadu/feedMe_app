
export interface Ingredients{
  name: string; //name of ingredient
  amount: string; 
}

export interface Recipe {
  // Fields in result
  title: string;
  image: string;
  id: string;
  usedIngredientCount: string;
  hasIngredients: boolean;
  ingredients: Ingredients[]; //ingredient list w/amounts
  instructions: string;
  summary: string;
}
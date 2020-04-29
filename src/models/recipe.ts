/*
This file contains a recipe interface that lays out the fields that are in a recipe.
A recipe can have the fields that are defined below.
*/

import { Ingredients } from '../models/ingredient';

export interface Recipe {
  // Fields in result
  title: string;
  image: string;
  id: string;
  usedIngredientCount: string;
  hasIngredients: boolean;
  ingredients: Ingredients[]; //ingredient list w/amounts from Ingredient interface
  instructions: string;
  summary: string;
}
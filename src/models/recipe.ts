/*
This file contains a recipe interface that lays out the fields that are in a recipe
*/

import { Ingredients } from '../models/ingredient';

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
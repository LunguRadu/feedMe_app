/*
This file sets up and holds the state of the app.
It stores values so they can be used multiple times within the app code.
*/

import { Recipe } from '../../models/recipe';

export interface RecipesState {
  recipes: Recipe[];
  searchText?: string;
  loading?: boolean;
}
import { Recipe } from '../../models/recipe';

export interface RecipesState {
  recipes: Recipe[];
  searchText?: string;
  loading?: boolean;
}
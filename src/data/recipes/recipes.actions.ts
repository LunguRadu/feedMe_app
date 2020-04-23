import { getRecipeData, getSingleRecipeData } from '../dataApi';
import { ActionType } from '../../util/types';
import { RecipesState } from './recipes.state';
import { Recipe } from '../../models/recipe';

export const loadRecipeData = (ingredients: string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await getRecipeData(ingredients);
  dispatch(setData(data));// sets all recipes
  dispatch(setLoading(false));
}
export const loadSingleRecipeData = (id : string, recipes: Recipe[]) => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await getSingleRecipeData(id, recipes);
  dispatch(setData(data));
  dispatch(setLoading(false));
}


export const setLoading = (isLoading: boolean) => ({
  type: 'set-recipes-loading',
  isLoading
} as const);

export const setData = (data: RecipesState) => ({
  type: 'set-recipes-data',
  data
} as const);

export const setSearchText = (searchText?: string) => ({ 
  type: 'set-search-text', 
  searchText 
} as const);

export type RecipesActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
  | ActionType<typeof setSearchText>
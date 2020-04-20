import { getRecipeData, getDummyData, getSingleRecipeData } from '../dataApi';
import { ActionType } from '../../util/types';
import { RecipesState } from './recipes.state';
import { async } from 'q';
import { Recipe } from '../../models/recipe';

export const loadRecipeData = (ingredients: string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  // const data = await getRecipeData(ingredients);
  const data = await getDummyData();
  dispatch(setData(data));// sets all recipes
  dispatch(setLoading(false));
}
export const loadSingleRecipeData = (id : string, recipe: Recipe) => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await getSingleRecipeData(id, recipe);
  // dispatch(setSingleRecipeData(data));
  dispatch(setLoading(false));
}

export const setSingleRecipeData = (data: Recipe) => ({
  type: 'set-singleRecipe-data',
  data
}as const);

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
  | ActionType<typeof setSingleRecipeData>
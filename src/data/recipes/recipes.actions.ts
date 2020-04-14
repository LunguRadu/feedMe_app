import { getRecipeData } from '../dataApi';
import { ActionType } from '../../util/types';
import { RecipesState } from './recipes.state';

export const loadRecipeData = (ingredients: string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await getRecipeData(ingredients);
  // const data = await getDummyData();
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
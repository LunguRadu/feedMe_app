
import { recipesReducer, loggerRecipesReducer } from './recipes/recipes.reducer';

export const initialState: AppState = {
    recipes: [],
    loading: false,
};

export const reducers = loggerRecipesReducer;//recipesReducer;

export type AppState = ReturnType<typeof reducers>;
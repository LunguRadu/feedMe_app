/*
This file sets up and holds the state of the app.
It stores values so they can be used multiple times within the app code.
*/

import {loggerRecipesReducer } from './recipes/recipes.reducer';

export const initialState: AppState = {
    recipes: [],
    loading: false,
};

export const reducers = loggerRecipesReducer;//recipesReducer;

export type AppState = ReturnType<typeof reducers>;

/*
This file is modeled after the reducer from this project https://github.com/ionic-team/ionic-react-conference-app.
*/

import { RecipesActions } from './recipes.actions';
import { RecipesState } from './recipes.state';

export const recipesReducer = (state: RecipesState, action: RecipesActions): RecipesState => {
  switch (action.type) {
    case 'set-recipes-loading': {
      return { ...state, loading: action.isLoading };
    }
    case 'set-recipes-data': {
      return { ...state, ...action.data };
    }
    case 'set-search-text': {
      return { ...state, searchText: action.searchText };
    }
  }
}


const logger = (reducer: typeof recipesReducer) => {
    const reducerWithLogger = (state: RecipesState, action: RecipesActions) => {
      console.log("%cPrevious State:", "color: #9E9E9E; font-weight: 700;", state);
      console.log("%cAction:", "color: #00A7F7; font-weight: 700;", action);
      console.log("%cNext State:", "color: #47B04B; font-weight: 700;", reducer(state,action));
      return reducer(state,action);
    };
    return reducerWithLogger;
  }
  
  export const loggerRecipesReducer = logger(recipesReducer);
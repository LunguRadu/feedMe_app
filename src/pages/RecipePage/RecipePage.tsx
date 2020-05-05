/*
 This is a file that creates the Recipe Page to display a singular recipe after being clicked.
*/

import React, { useContext} from "react";
import { Recipe } from "../../models/recipe";
import { AppContext } from "../../data/AppContext";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  IonImg,
  IonText
} from "@ionic/react";
// import { fastFoodOutline } from "ionicons/icons";
import { RouteComponentProps } from "react-router";
import "./RecipePage.css";
import { loadSingleRecipeData } from "../../data/recipes/recipes.actions";
import { connect } from "../../data/connect";

interface StateProps
  extends RouteComponentProps<{ // loads in the state of the app, with the id that was clicked
    id: string;
    loadSingleRecipeData: any;
  }> {}

interface DispatchProps {
  loadSingleRecipeData: typeof loadSingleRecipeData; // allows loadSingleRecipeData to be used and updated within this file
}
type RecipeViewProps = StateProps & DispatchProps;


const RecipeView: React.FC<RecipeViewProps> = ({
  match,
  loadSingleRecipeData,
}) => {
  const { state } = useContext(AppContext);

  let id = match.params.id;
  let recipe = state.recipes.find((x) => x.id === id) as Recipe; // finds recipe with this id
  useIonViewWillEnter(() => {
    loadSingleRecipeData(id, state.recipes);  //calls loadSingleRecipe to be updated or set
  });

  // Adding recipe components to the RecipePage
  return (
    <IonPage id="view-recipe-page">
      <IonHeader>
        <IonToolbar className="header">
        <h1>#feedMe</h1>
        </IonToolbar>
      </IonHeader>
      <IonToolbar className="toolBar">
        <IonButtons>
          <IonBackButton
            text="Back to List"
            defaultHref="/home"
          ></IonBackButton>
        </IonButtons>
      </IonToolbar>

      {
        <IonContent>
          {recipe ? (
            <>
                
              <IonText>
                <h2> {recipe.title}  </h2>
                  
                <h4> Uses {recipe.usedIngredientCount} of your ingredients!</h4>
         
                <IonImg src = {recipe.image} alt = "recipe"/>
                <h3> ~ Ingredient List ~ </h3>
                <h5> {recipe.ingredients.map(ingredient => <li>{ingredient.name}  - 
              
                {ingredient.amount}</li>)}</h5>              
                <div></div> 
                <h3>~ Instructions ~ </h3>             
                <p> {recipe.instructions} </p>
              </IonText>

            </>
          ) : (
            <div>Recipe not found</div>
          )}
        </IonContent> 
      }
    </IonPage>
  );
};

export default connect<StateProps, DispatchProps>({ // exporting this pages elements to the app state to be saved
  mapDispatchToProps: {
    loadSingleRecipeData,
  },
  component: React.memo(RecipeView),
});

import React, { useContext, useEffect } from "react";
import { Recipe } from "../../models/recipe";
import { AppContext } from "../../data/AppContext";
import { listOfIngredients } from "../../data/ingredients/userIngredients";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { fastFoodOutline } from "ionicons/icons";
import { RouteComponentProps } from "react-router";
import "./RecipePage.css";
import { loadSingleRecipeData } from "../../data/recipes/recipes.actions";
import { connect } from "../../data/connect";

interface StateProps
  extends RouteComponentProps<{
    id: string;
    loadSingleRecipeData: any;
  }> {}

interface DispatchProps {
  loadSingleRecipeData: typeof loadSingleRecipeData;
}
type RecipeViewProps = StateProps & DispatchProps;
// type RecipeViewProps = StateProps;

const RecipeView: React.FC<RecipeViewProps> = ({
  match,
  loadSingleRecipeData,
}) => {
  const { state, dispatch } = useContext(AppContext);

  let id = match.params.id;
  let recipe = state.recipes.find((x) => x.id === id) as Recipe;
  useIonViewWillEnter(() => {
    loadSingleRecipeData(id, state.recipes);
  });
  console.log(id);
  console.log("This is testing to see if ID is found");

  // will eventually display induvidual recipe
  return (
    <IonPage id="view-message-page">
      <IonHeader>
        <h1>#feedMe</h1>
      </IonHeader>
      <IonToolbar>
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
              <IonItem>
                <IonIcon icon={fastFoodOutline} color="success"></IonIcon>
                <IonLabel className="ion-text-wrap">
                  <h2> {recipe.title} </h2>
                  <h4> Uses {recipe.usedIngredientCount} of your ingredients!</h4> 
                </IonLabel>            
              </IonItem>

             <img src = {recipe.image} alt = "recipe"/>
             
              <h5><h3>~ Ingredient List ~ </h3> {recipe.ingredients.map(ingredient => <li>{ingredient.name}  - 
              
              {ingredient.amount}</li>)}</h5>              
              <div></div>              
              <p> {recipe.instructions} </p>
            
            </>
          ) : (
            <div>Recipe not found</div>
          )}
        </IonContent>
      }
    </IonPage>
  );
};

export default connect<StateProps, DispatchProps>({
  mapDispatchToProps: {
    loadSingleRecipeData,
  },
  component: React.memo(RecipeView),
});

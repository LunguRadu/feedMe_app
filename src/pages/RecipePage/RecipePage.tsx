import React, { useContext, useEffect} from 'react';
import { Recipe } from '../../models/recipe';
import {AppContext } from '../../data/AppContext';
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
  useIonViewWillEnter
} from '@ionic/react';
import {fastFoodOutline } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';
import './RecipePage.css';
import {setSingleRecipeData, loadSingleRecipeData } from '../../data/recipes/recipes.actions';
import { connect } from '../../data/connect';

interface StateProps extends RouteComponentProps<{
  id: string;
}> {}

interface DispatchProps {
  setSingleRecipeData: typeof setSingleRecipeData;
  
}
type RecipeViewProps = StateProps & DispatchProps;

const RecipeView: React.FC<RecipeViewProps> = ({ match }) => {



  const { state, dispatch } = useContext(AppContext);

  let id = match.params.id;
  let recipe = state.recipes.find(x => x.id === id)
  console.log(id);
  console.log("This is testing to see if ID is found");
  // useEffect(() => {
    //   loadSingleRecipeData(id, recipe);
    // }, [loadSingleRecipeData(id, recipe)]);

// will eventually display induvidual recipe
  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton text="Back to List" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      { <IonContent fullscreen>
        {recipe ? (
          <>
            <IonItem>
              <IonIcon icon={fastFoodOutline} color="success"></IonIcon>
              <IonLabel className="ion-text-wrap">
                <h2>
                  {recipe.title}
                </h2>
                <h3> <IonNote>Recipe Instructions</IonNote></h3>
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              <h1>{recipe.image}</h1>
              <p>
                r
              </p>
            </div>
          </>
        ) : <div>Recipe not found</div>}
      </IonContent> }
    </IonPage>
  );
};

export default connect<StateProps, DispatchProps>({
  mapDispatchToProps: {
    setSingleRecipeData
  },
  component: React.memo(RecipeView)
});

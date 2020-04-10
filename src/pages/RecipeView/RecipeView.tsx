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
import './RecipeView.css';

interface RecipeViewProps extends RouteComponentProps<{
  id: string;
}> {}

const RecipeView: React.FC<RecipeViewProps> = ({ match }) => {

  const { state, dispatch } = useContext(AppContext);

  let id = match.params.id;
  let recipe = state.recipes.find(x => x.id === id)

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
              <IonIcon icon={fastFoodOutline} color="primary"></IonIcon>
              <IonLabel className="ion-text-wrap">
                <h2>
                  {recipe.name}
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

export default RecipeView;

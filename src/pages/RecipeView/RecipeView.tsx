import React, { useState } from 'react';
import { Recipe, getRecipe } from '../../data/recipes';
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

interface ViewMessageProps extends RouteComponentProps<{ id: string; }> { }

const ViewMessage: React.FC<ViewMessageProps> = ({ match }) => {

  const [recipe, setRecipe] = useState<Recipe>(); // collects current recipe data

  useIonViewWillEnter(() => {
    const msg = getRecipe(match.params.id);
    setRecipe(msg);
  });
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

      <IonContent fullscreen>
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
        ) : <div>Message not found</div>}
      </IonContent>
    </IonPage>
  );
};

export default ViewMessage;

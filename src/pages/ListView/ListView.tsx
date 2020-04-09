import React from 'react';
import {
  IonItem,
  IonLabel
  } from '@ionic/react';
import { Recipe } from '../../data/recipes';
import './ListView.css';

interface ListViewProps {
  recipe: Recipe;
}

const ListView: React.FC<ListViewProps> = ({ recipe }) => { // sets each recipe to list format with name and an image (eventually)
  return (
    <IonItem routerLink={`/message/${recipe.id}`} detail={false}> 
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {recipe.name}
        </h2>
        <h3>{recipe.image}</h3>
        <p>
          [RECIPE INSTRUCTIONS GO HERE]
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default ListView;

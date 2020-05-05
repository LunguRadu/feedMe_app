/*
This is the file where an individual list element is created with one recipe.
*/
import React from "react";
import { IonItem, IonLabel, IonText, IonImg } from "@ionic/react";
import { Recipe } from "../../models/recipe";
import "./ListPage.css";

interface ListViewProps { //gets singular recipe to display
  recipe: Recipe;
}

const ListView: React.FC<ListViewProps> = ({ recipe }) => {
  // sets each recipe to list format with name and an image
  return (
    <IonItem routerLink={`/recipelist/${recipe.id}`} detail={false}>
      <IonLabel className="ion-text-wrap">
          <IonImg src = {recipe.image} alt = "recipe" />
          <IonText>
            <h2>{recipe.title}</h2>
        </IonText>
      
      </IonLabel>
    </IonItem>
  );
};

export default ListView;

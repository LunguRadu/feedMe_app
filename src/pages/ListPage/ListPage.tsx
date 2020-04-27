import React from "react";
import { IonItem, IonLabel } from "@ionic/react";
import { Recipe } from "../../models/recipe";
import "./ListPage.css";

interface ListViewProps {
  recipe: Recipe;
}

const ListView: React.FC<ListViewProps> = ({ recipe }) => {
  // sets each recipe to list format with name and an image (eventually)
  return (
    <IonItem routerLink={`/recipelist/${recipe.id}`} detail={false}>
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>{recipe.title}</h2>
      </IonLabel>
    </IonItem>
  );
};

export default ListView;

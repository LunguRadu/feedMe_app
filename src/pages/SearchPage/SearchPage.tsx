import React, { useState } from 'react';
import './SearchPage.css';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonSearchbar,
  IonPage,
  IonToolbar,
  IonFooter,
  IonList,
  IonItem
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';

interface SearchPageProps extends RouteComponentProps<{ id: string; }> { }

const SearchPage: React.FC<SearchPageProps> = ({ match }) => {

  const [IngredientText, setSearchText] = useState('');

  const searchbar = document.querySelector('IonSeachbar');

  var listOfIngredients: string[] = [];
  let paragraph:HTMLHeadingElement = document.getElementById('ingredientsList') as HTMLHeadingElement;
  var currentText:string="";

  //TODO: Set inputs in search href to actual list of inputs
  return (
    <IonPage id="home-page">
      <IonHeader 
        translucent>
          <p>Input Ingredients</p>
        <IonSearchbar value={IngredientText} onIonChange={e => currentText=(e.detail.value!)} onIonBlur={()=>listOfIngredients.push(currentText)}>
        </IonSearchbar>
      </IonHeader>


      <IonContent fullscreen>
      <div id = 'possibleSearches'>
        <IonList>
          <IonItem>Chicken</IonItem>
          <IonItem>Carrots</IonItem>
          <IonItem>Spinach</IonItem>
          <IonItem>Eggs</IonItem>
          <IonItem>Potatoes</IonItem>
        </IonList>
      </div>

      <div>
        <h5 id='ingredientsList'>Inputted ingredients go here</h5>
      </div>
      </IonContent>


      <IonFooter>
      <IonToolbar>
          <IonButtons>
          <IonButton onClick = {() => paragraph.innerText=(listOfIngredients.toString())}>Add Ingredient</IonButton>
          <IonButton expand = "block" 
                      fill ="solid" 
                      shape ="round" 
                      size = "large" 
                      color ="success" 
                      href="/home?inputs=chicken,kale"
                      >
                        SEARCH
                      </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default SearchPage;

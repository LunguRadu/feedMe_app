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

  const listOfIngredients: string[] = [];
  var paragraph:HTMLHeadingElement = document.getElementById('ingredientsList') as HTMLHeadingElement;
  var currentText:string="";
  var url:string="/home?inputs=peas";
  var searchButton:HTMLButtonElement = document.getElementById('searchButton') as HTMLButtonElement;

  //TODO: Move this to seperate tsx file
  //TODO: Account for invalid or blank inputs
  function addButton(){
    listOfIngredients.push(currentText)
    paragraph.innerText=(listOfIngredients.toString())
    // url=addTwoStrings("/home?inputs=","peas")
    // alert(url)
    // searchButton.setAttribute('href','/home')
    //TODO: Add code to clear searchbar when button is clicked
  }

  function addTwoStrings(s1:string,s2:string){
    return s1.concat(s2);
  }

  //TODO: Set inputs in search href to actual list of inputs
  return (
    <IonPage id="home-page">
      <IonHeader 
        translucent>
          <p>Input Ingredients</p>
        <IonSearchbar value={IngredientText} onIonChange={e => currentText=(e.detail.value!)}>
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
          <IonButton onClick = {() => addButton()}>Add Ingredient</IonButton>
          <IonButton id="seachButton"
                      expand = "block" 
                      fill ="solid" 
                      shape ="round" 
                      size = "large" 
                      color ="success" 
                      href={url}
                      // target = "self" 
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

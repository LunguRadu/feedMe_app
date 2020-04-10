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
  IonItem,
  IonIcon,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { playOutline } from 'ionicons/icons';

interface SearchPageProps extends RouteComponentProps<{ id: string; }> { }

const SearchPage: React.FC<SearchPageProps> = ({ match }) => {

  const [IngredientText, setSearchText] = useState('');

  var listOfIngredients: string[] = [];
  var paragraph:HTMLHeadingElement = document.getElementById('ingredientsList') as HTMLHeadingElement;
  var currentText:string="";
  var url:string=addTwoStrings("/home?inputs=",listOfIngredients.toString());
  // var searchBar: HTMLIonSearchbarElement = document.getElementById('searchBar') as HTMLIonSearchbarElement;

  //TODO: Move this to seperate tsx file
  //TODO: Account for invalid or blank inputs
  function addButton(){
    listOfIngredients.push(currentText)
    paragraph.innerText=(listOfIngredients.toString())
    url=addTwoStrings("/home?inputs=",listOfIngredients.toString());
    alert(url)
    // setSearchText(" ");
    //TODO: ^ Fix code to clear searchbar when button is clicked
  }

  function addTwoStrings(s1:string,s2:string){
    return s1.concat(s2);
  }

  //TODO: Set inputs in search href to actual list of inputs
  return (
    <IonPage id="home-page">
      <IonHeader translucent>
      </IonHeader>


      <IonContent fullscreen>
        <br></br>
        <p>Type in Ingredients...</p>
        <IonSearchbar id = "searchBar" value={IngredientText} onIonChange={e => currentText=(e.detail.value!)}>
        </IonSearchbar>

      <div id = 'possibleSearches'>
        {/* TODO:Add more to this list
        TODO: Make this list its own scroll area
        TODO: Add icons */}
        <IonList>
          <IonItem> <IonIcon icon={playOutline}></IonIcon> &nbsp; Apples</IonItem>
          <IonItem> <IonIcon icon={playOutline}></IonIcon>&nbsp; Bananas</IonItem>
          <IonItem> <IonIcon icon={playOutline}></IonIcon>&nbsp; Carrots</IonItem>
          <IonItem> <IonIcon icon={playOutline}></IonIcon>&nbsp; Durians</IonItem>
          <IonItem> <IonIcon icon={playOutline}></IonIcon>&nbsp; Eggs</IonItem>
        </IonList>
      </div>
      <div>
        <h5>Your ingredients:</h5>
        <h6 id='ingredientsList'>***</h6>
      </div>
      </IonContent>


      <IonFooter>
      <IonToolbar>
          <IonButtons>
          <IonButton onClick = {() => addButton()}>Add Ingredient</IonButton>
          <IonButton id="seach-button"
                      expand = "block" 
                      fill ="solid" 
                      shape ="round" 
                      size = "large" 
                      color ="success" 
                      href={url}
                      // TODO: Check that there is at least one input. 
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

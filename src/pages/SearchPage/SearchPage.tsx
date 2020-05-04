/*
 This is a file that creates the Search Page where the user adds ingredients to search for using the API.
 This is identified as the home-page because it's the first page the app opens. 
*/

import React, { useState } from "react";
import "./SearchPage.css";
import { possibleIngredients } from "../../data/ingredients/possibleIngredients";
import { listOfIngredients } from "../../data/ingredients/userIngredients";
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
  IonRow,
  IonCol,
  IonGrid,
  IonIcon
} from "@ionic/react";
import {
  clearList,
  addButton,
  addTwoStrings,
  addFromScrollList,
  removeOneIngredient,
  enterKeyPress,
  tooFewIngredients,
} from "./SearchPageFunctions";
import {
  setSearchText,
  loadRecipeData,
} from "../../data/recipes/recipes.actions";
import { connect } from "../../data/connect";


interface StateProps {
  id: string;
  history: any;
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
  loadRecipeData: typeof loadRecipeData;
}

type SearchPageProps = StateProps & DispatchProps;

const SearchPage: React.FC<SearchPageProps> = ({ history, loadRecipeData }) => {
  const [IngredientText] = useState("");

  //Current SearchBar text
  var currentText: string = "";

  //Modified version of listOfIngredients
  var url: string = addTwoStrings(
    "/home?inputs=",
    listOfIngredients.toString()
  );

  //HTML IonList element containing input list for reference
  var inputList: HTMLIonListElement = document.getElementById(
    "ingredientsList"
  ) as HTMLIonListElement;

  //HTML IonSearchBar element for reference
  var searchBar: HTMLIonSearchbarElement = document.getElementById(
    "searchBar"
  ) as HTMLIonSearchbarElement;

  //Adds event listener to the SearchBar to detect Enter Key Press
  function enterEvent(searchBar: HTMLIonSearchbarElement, list: string[]) {
    searchBar.addEventListener("keyup", (e) => {
      enterKeyPress(e, list, url, currentText, inputList, searchBar);
    });
  }

  return (
    // Adding components to the SearchPage
    <IonPage id="home-page">
      
      <IonHeader>
        <IonToolbar className="toolbar" >
        <h1 className="feedMeText">#feedMe</h1>
        </IonToolbar>
      

     
      <IonToolbar className ="selectIngredientsToolBar"> 
        <div className="slectIngredientsText">add ingredients:</div>
      </IonToolbar>

      <IonButtons id="addButton">
        <IonSearchbar className = "searchBar"
          type ="text"
          showCancelButton="focus"
          placeholder="type ingredients..."
          id="searchBar"
          value={IngredientText}
          onIonChange={(e) => (currentText = e.detail.value!)}
          onIonFocus={() => enterEvent(searchBar, listOfIngredients)}
        ></IonSearchbar>
      <IonButton className = "addButton"
         
         size="large"
         fill="outline"
         shape="round"
        onClick={() =>
          addButton(
            listOfIngredients,
            url,
            currentText,
            inputList,
            searchBar
          )
        }
      > 
      + ADD
    </IonButton>
    </IonButtons>
    </IonHeader> 
    <IonContent>
      
        <div id="possibleSearches">
          <IonList inset class="bg-transparent" lines="none">
            {possibleIngredients.map((n) => {
              for (var _i = 0; _i < possibleIngredients.length; _i++) {
                return (
                  <IonItem
                    button
                    lines="inset"
                    onClick={() =>
                      addFromScrollList(
                        n,
                        listOfIngredients,
                        url,
                        currentText,
                        inputList,
                        searchBar
                      )
                    }
                  >
                    <IonButton 
                    className = "listButton" fill="clear">
                      {n}
                    </IonButton>
                  </IonItem>
                );
              }
            })}
          </IonList>
        </div>
      </IonContent>

     
        <div className="ingredientListText"> your ingredients:</div>
          <IonList id="ingredientsList"> *** </IonList>
       
        <IonFooter>
        <IonToolbar className = "footerTool">
          <IonGrid className="grid">
            <IonRow>
              <IonButtons>
                <IonCol size="5">
                  <IonButton className = "deleteButton"
                    buttonType = "string"
                    size="large"
                    onClick={() =>
                      removeOneIngredient(
                        listOfIngredients,
                        url,
                        currentText,
                        inputList
                      )
                    }
                  >
                    <IonIcon slot="start" name="close"></IonIcon>
                    Delete
                  </IonButton>
                </IonCol>

                <IonCol size="6">
                  <IonButton className = "clearButton"
                    buttonType ="string"
                    size="large"
                    onClick={() => {
                      clearList(listOfIngredients, url, currentText, inputList);
                    }}
                  >
                    
                    <IonIcon slot="start" name="refresh-circle-sharp"></IonIcon>
                    Clear
                  </IonButton>
                </IonCol>

                <IonCol size="6">
                  <IonButton className = "searchButton"
                    buttonType="string"
                    size="large"
                    fill="clear"
                    shape="round"
                    onClick={(e) => {
                      if(listOfIngredients.length<=1){
                        tooFewIngredients(inputList, searchBar)
                      }
                      else{
                      e.preventDefault();
                      loadRecipeData(listOfIngredients.toString());
                      history.push("/recipelist");
                      }
                    }}
                  >
                    <IonIcon slot="start" name="search-sharp"></IonIcon>
                    SEARCH
                  </IonButton>
                </IonCol>
              </IonButtons>
            </IonRow>
          </IonGrid>
        </IonToolbar>
         </IonFooter>
      
    </IonPage>
  );
};

export default connect<StateProps, DispatchProps>({
  mapDispatchToProps: {
    setSearchText,
    loadRecipeData,
  },
  component: React.memo(SearchPage),
});

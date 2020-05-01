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
} from "@ionic/react";
import {
  clearList,
  addButton,
  addTwoStrings,
  addFromScrollList,
  removeOneIngredient,
  enterKeyPress,
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
        <h1>#feedMe</h1>
      </IonHeader> 
      <IonToolbar> <p>Select Ingredients:</p></IonToolbar>
      <IonToolbar>
      <IonButtons id="addButton">
        <IonSearchbar className = "box-shadow"
          type ="text"
          showCancelButton="focus"
          placeholder="type ingredients..."
          id="searchBar"
          value={IngredientText}
          onIonChange={(e) => (currentText = e.detail.value!)}
          onIonFocus={() => enterEvent(searchBar, listOfIngredients)}
        ></IonSearchbar>
      <IonButton 
         strong
         shape ="round"
         fill="solid"
         size="large"
         color="success"
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
        {" "}
        Add{" "}
    </IonButton>
    </IonButtons>
    </IonToolbar>
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
                    <IonButton class = "size" fill="clear" color="success">
                      {n}
                    </IonButton>
                  </IonItem>
                );
              }
            })}
          </IonList>
        </div>
      </IonContent>

      <IonFooter translucent>
        <div>
          <p>Your ingredients:</p>

          <IonList id="ingredientsList"> *** </IonList>
        </div>

        <IonToolbar>
          <IonGrid>
            <IonRow className="ion-align-items-center">
              <IonButtons>
                <IonCol>
                </IonCol>

                <IonCol>
                  <IonButton
                    size="large"
                    color="success"
                    onClick={() =>
                      removeOneIngredient(
                        listOfIngredients,
                        url,
                        currentText,
                        inputList
                      )
                    }
                  >
                    {" "}
                    Delete{" "}
                  </IonButton>
                </IonCol>

                <IonCol>
                  <IonButton
                    size="large"
                    color="success"
                    onClick={() => {
                      clearList(listOfIngredients, url, currentText, inputList);
                    }}
                  >
                    {" "}
                    Clear{" "}
                  </IonButton>
                </IonCol>

                <IonCol>
                  <IonButton
                    size="large"
                    class="seach-button"
                    color="success"
                    fill="solid"
                    shape="round"
                    onClick={(e) => {
                      e.preventDefault();
                      loadRecipeData(listOfIngredients.toString());
                      history.push("/recipelist");
                    }}
                  >
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

import React, { useState, useContext } from "react";
import "./SearchPage.css";
import { AppContext } from "../../data/AppContext";
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
  IonIcon,
  IonTabs,
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
  clearSearchText,
} from "./SearchPageFunctions";
import { RouteComponentProps } from "react-router";
import { attachProps } from "@ionic/react/dist/types/components/utils";
import {
  setSearchText,
  loadRecipeData,
} from "../../data/recipes/recipes.actions";
import { connect } from "../../data/connect";
import { playOutline } from "ionicons/icons";

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
  const [IngredientText, setSearchText] = useState("");
  const { state, dispatch } = useContext(AppContext);

  var currentText: string = "";
  var url: string = addTwoStrings(
    "/home?inputs=",
    listOfIngredients.toString()
  );
  var inputList: HTMLIonListElement = document.getElementById(
    "ingredientsList"
  ) as HTMLIonListElement;
  var searchBar: HTMLIonSearchbarElement = document.getElementById(
    "searchBar"
  ) as HTMLIonSearchbarElement;

  function enterEvent(searchBar: HTMLIonSearchbarElement, list: string[]) {
    searchBar.addEventListener("keyup", (e) => {
      enterKeyPress(e, list, url, currentText, inputList, searchBar);
    });
  }

  return (
    <IonPage id="home-page">
      <IonHeader>
        <h1>#feedMe</h1>
      </IonHeader>
      <IonToolbar> <p>Select Ingredients:</p></IonToolbar>
      <IonToolbar>
      <IonButtons id="addButton">
        <IonSearchbar 
          type ="text"
          showCancelButton="focus"
          color = "light"
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
                    <IonButton size="default" fill="clear" color="success">
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

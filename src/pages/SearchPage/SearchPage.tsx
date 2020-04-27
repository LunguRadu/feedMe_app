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
  var paragraph: HTMLIonListElement = document.getElementById(
    "ingredientsList"
  ) as HTMLIonListElement;
  var searchBar: HTMLIonSearchbarElement = document.getElementById(
    "searchBar"
  ) as HTMLIonSearchbarElement;

  function enterEvent(searchBar: HTMLIonSearchbarElement, list: string[]) {
    searchBar.addEventListener("keyup", (e) => {
      enterKeyPress(e, list, url, currentText, paragraph, searchBar);
    });
  }

  return (
    <IonPage id="home-page">
      <IonHeader>
        <h1>#feedMe</h1>
      </IonHeader>

      <IonButtons  
          id="addButton">
      <IonToolbar>
        <p>Select Ingredients:</p>
        <IonSearchbar 
          placeholder="type ingredients..."
          id="searchBar"
          value={IngredientText}
          onIonChange={(e) => (currentText = e.detail.value!)}
          onIonFocus={() => enterEvent(searchBar, listOfIngredients)}
        ></IonSearchbar>
      </IonToolbar>
      
        <IonButton 
          size="small"
          onClick={() =>
            addButton(
              listOfIngredients,
              url,
              currentText,
              paragraph,
              searchBar
            )
          }
        >
          {" "}
          Add{" "}
      </IonButton>
    </IonButtons>

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
                        paragraph,
                        searchBar
                      )
                    }
                  >
                    <IonButton size="default" fill="clear" color="warning">
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
                    size="small"
                    onClick={() =>
                      removeOneIngredient(
                        listOfIngredients,
                        url,
                        currentText,
                        paragraph
                      )
                    }
                  >
                    {" "}
                    Delete{" "}
                  </IonButton>
                </IonCol>

                <IonCol>
                  <IonButton
                    size="small"
                    onClick={() => {
                      clearList(listOfIngredients, url, currentText, paragraph);
                    }}
                  >
                    {" "}
                    Clear{" "}
                  </IonButton>
                </IonCol>

                <IonCol>
                  <IonButton
                    size="small"
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

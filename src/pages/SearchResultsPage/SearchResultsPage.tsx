import React, { /*Component,*/ useState, useContext, useEffect } from "react";
import MessageListItem from "../ListPage/ListPage";
import { Recipe } from "../../models/recipe";
import { AppContext } from "../../data/AppContext";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonBackButton,
} from "@ionic/react";
import { useLocation } from "react-router-dom";

import "./SearchResultsPage.css";

const SearchResultsPage: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  //Dispatch -> update state

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let inputs = useQuery().get("inputs");

  // Adding components to the SearchResultPage
  return (
    <IonPage id="search-results-page">
      <IonHeader>
        <h1>#feedMe</h1>
      </IonHeader>
      <br></br>
      <IonToolbar>
        <IonBackButton
          text="Back to Search"
          defaultHref="/searchpage"
        ></IonBackButton>
        <IonTitle>
          <u>Matching Recipes</u>
        </IonTitle>
      </IonToolbar>

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">List of Recipes:</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {state.recipes.map((r) => (
            <MessageListItem key={r.id} recipe={r} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SearchResultsPage;

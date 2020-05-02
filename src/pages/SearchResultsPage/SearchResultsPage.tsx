/*
This is the file where all individual list elements are put together into one list to be
displayed after searching.
*/
import React, { useContext } from "react";
import MessageListItem from "../ListPage/ListPage";
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

import "./SearchResultsPage.css";

const SearchResultsPage: React.FC = () => {
  const { state } = useContext(AppContext);

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };


  // Adding components to the SearchResultPage
  return (
    <IonPage id="search-results-page">

      <IonHeader>
        <IonToolbar className="header">
        <h1>#feedMe</h1>
        </IonToolbar>
      </IonHeader>

      <br></br>
      <IonToolbar className="toolBar">
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

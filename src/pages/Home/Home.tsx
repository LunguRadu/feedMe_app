import React, { /*Component,*/ useState, useContext, useEffect} from 'react';
import MessageListItem from '../ListView/ListView';
import { Recipe } from '../../models/recipe';
import {AppContext } from '../../data/AppContext';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonBackButton
} from '@ionic/react';
import {
  useLocation
} from "react-router-dom";

import './Home.css';

const Home: React.FC = () => {
  
  const { state, dispatch } = useContext(AppContext);

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let inputs = useQuery().get("inputs");

  return (
    <IonPage>
      <IonHeader>
        <br></br>
        <IonToolbar>
          <IonBackButton text="Back to Search" defaultHref="/searchpage"></IonBackButton>
          <br></br>
          <IonTitle>Inputs: {inputs}</IonTitle>
          <br></br>
          <IonTitle>List of Recipes:</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              List of Recipes:
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {state.recipes.map(r => <MessageListItem key={r.id} recipe={r} />)}
        </IonList>
        
      </IonContent>
    </IonPage>
  );
};

export default Home;
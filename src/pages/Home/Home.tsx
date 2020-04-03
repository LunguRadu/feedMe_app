import React, { /*Component,*/ useState } from 'react';
import MessageListItem from '../ListView/ListView';
import { Message, getMessages } from '../../data/recipes';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonBackButton
} from '@ionic/react';
import {
  useLocation
} from "react-router-dom";

import './Home.css';

const Home: React.FC = () => {

  const [messages, setMessages] = useState<Message[]>([]);

  useIonViewWillEnter(() => {
    const msgs = getMessages();
    setMessages(msgs);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let inputs = useQuery().get("inputs");

  function fetchRecipes(ingredients: string | null) {
    fetch('https://api.edamam.com/search?q=' + ingredients + '&app_id=12ef1ccd&app_key=c38b84d50a0fb09c60c7f64af6853958')
      .then(res => res.json())
      .then(
        (result) => {
          console.log('Found ' + result.count + ' recipes!');
          console.log('Here they are: ' + result.hits);
          console.log(result);
          //TODO: setMessages to result.hits
          //  Do this after setMessages expects correct format
          setMessages([
            {
              fromName: '1',
              subject: result.hits[0].recipe.label,
              date: '1000 ingredient matches',
              id: 0
            }]); //Temporary hack to show recipe lablel of first result TODO: REMOVE!
        },
        (error) => { //If an errors
          //Print error details to console
          console.error('Encountered an error: ' + error);
        }
      )
  }
  fetchRecipes(inputs);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>List of Recipes:</IonTitle>
  <IonTitle>Params: {inputs}</IonTitle>
          <IonBackButton text="Back to Search" defaultHref="/searchpage"></IonBackButton>
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
          {messages.map(m => <MessageListItem key={m.id} message={m} />)}
        </IonList>
        
      </IonContent>
    </IonPage>
  );
};

export default Home;
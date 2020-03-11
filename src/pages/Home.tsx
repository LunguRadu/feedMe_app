import React, { /*Component,*/ useState } from 'react';
// import {
//   IonApp,
//   IonContent,
//   IonCard,
//   IonCardHeader,
//   IonCardTitle,
//   IonCardSubtitle
// } from '@ionic/react';

import MessageListItem from '../components/RecipeList';
import { Message, getMessages } from '../data/messages';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';

import './Home.css';

// class Home extends Component {
//   render() {
//     return (
      
//         <IonContent>
//           <IonCard>
//             <IonCardHeader>
          
//               <IonCardTitle>Home Page</IonCardTitle>
//             </IonCardHeader>
//           </IonCard>
//         </IonContent>
      
//     );
//   }
// }

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

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
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
          {messages.map(m => <MessageListItem key={m.id} message={m} />)}
        </IonList>
        
      </IonContent>
    </IonPage>
  );
};


export default Home;
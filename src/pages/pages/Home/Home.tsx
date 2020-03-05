import React, { Component } from 'react';
import {
  IonApp,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle
} from '@ionic/react';

class Home extends Component {
  render() {
    return (
      
        <IonContent>
          <IonCard>
            <IonCardHeader>
          
              <IonCardTitle>Home Page</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </IonContent>
      
    );
  }
}

export default Home;
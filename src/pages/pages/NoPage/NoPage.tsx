import React, { Component } from 'react';
import {
  IonApp,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle
} from '@ionic/react';

class NoPage extends Component {
  render() {
    return (
      
        <IonContent>
          <IonCard>
            <IonCardHeader>
          
              <IonCardTitle>NoPage Page</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </IonContent>
      
    );
  }
}

export default NoPage;
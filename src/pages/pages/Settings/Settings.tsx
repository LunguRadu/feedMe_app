import React, { Component } from 'react';
import {
  IonApp,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle
} from '@ionic/react';

class Settings extends Component {
  render() {
    return (
      
        <IonContent>
          <IonCard>
            <IonCardHeader>
          
              <IonCardTitle>Settings Page</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </IonContent>
      
    );
  }
}

export default Settings;
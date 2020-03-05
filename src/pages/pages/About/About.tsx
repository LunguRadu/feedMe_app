import React, { Component } from 'react';
import {
  IonApp,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle
} from '@ionic/react';

class About extends Component {
  render() {
    return (
      
        <IonContent>
          <IonCard>
            <IonCardHeader>
          
              <IonCardTitle>About Page</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </IonContent>
      
    );
  }
}

export default About;
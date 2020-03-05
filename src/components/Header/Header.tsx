import React, { Component } from 'react';
import {
  IonApp,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle
} from '@ionic/react';

class Header extends Component {
  render() {
    return (
      
        <IonContent>
          <IonCard>
            <IonCardHeader>
          
              <IonCardTitle>Header Page</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </IonContent>
      
    );
  }
}

export default Header;
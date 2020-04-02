import React from 'react';
import {
  IonItem,
  IonLabel,
  IonNote
  } from '@ionic/react';
import { Message } from '../../data/recipes';
import './ListView.css';

interface ListViewProps {
  message: Message;
}

const ListView: React.FC<ListViewProps> = ({ message }) => {
  return (
    // IMPORTANT
    <IonItem routerLink={`/message/${message.id}`} detail={false}>
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {message.fromName}
          <span className="date">
            <IonNote>{message.date}</IonNote>
          </span>
        </h2>
        <h3>{message.subject}</h3>
        <p>
          [RECIPE INSTRUCTIONS GO HERE]
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default ListView;

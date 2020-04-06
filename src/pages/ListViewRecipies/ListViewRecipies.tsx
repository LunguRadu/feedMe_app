// import React, { useState } from 'react';
// import { Message, getMessage } from '../data/messages';
// import {
//   IonBackButton,
//   IonButtons,
//   IonContent,
//   IonHeader,
//   IonIcon,
//   IonItem,
//   IonLabel,
//   IonNote,
//   IonPage,
//   IonToolbar,
//   useIonViewWillEnter
// } from '@ionic/react';
// import {fastFoodOutline } from 'ionicons/icons';
// import { RouteComponentProps } from 'react-router';
// import './ViewMessage.css';

// interface ViewMessageProps extends RouteComponentProps<{ id: string; }> { }

// const ViewMessage: React.FC<ViewMessageProps> = ({ match }) => {

//   const [message, setMessage] = useState<Message>();

//   useIonViewWillEnter(() => {
//     const msg = getMessage(parseInt(match.params.id, 10));
//     setMessage(msg);
//   });

//   return (
//     <IonPage id="view-message-page">
//       <IonHeader translucent>
//         <IonToolbar>
//           <IonButtons>
//             <IonBackButton text="Back" defaultHref="/home"></IonBackButton>
//           </IonButtons>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent fullscreen>
//         {message ? (
//           <>
//             <IonItem>
//               <IonIcon icon={fastFoodOutline} color="primary"></IonIcon>
//               <IonLabel className="ion-text-wrap">
//                 <h2>
//                   {message.fromName}
//                   <span className="date">
//                     <IonNote>{message.date}</IonNote>
//                   </span>
//                 </h2>
//                 <h3> <IonNote>Recipe Instructions</IonNote></h3>
//               </IonLabel>
//             </IonItem>

//             <div className="ion-padding">
//               <h1>{message.subject}</h1>
//               <p>
//                 [WIP]
//               </p>
//             </div>
//           </>
//         ) : <div>Message not found</div>}
//       </IonContent>
//     </IonPage>
//   );
// };

// export default ViewMessage;
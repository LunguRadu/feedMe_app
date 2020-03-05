import React, { Component } from 'react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import {IonApp} from '@ionic/react';
import Home from './pages/pages/Home/Home';

class App extends Component {
  render() {
    return <IonApp>
      <Home/>
    </IonApp>;
  }
}

export default App;
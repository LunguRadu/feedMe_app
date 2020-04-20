import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AppContextProvider } from './data/AppContext';
import ListView from './pages/ListPage/ListPage';
import RecipeView from './pages/RecipePage/RecipePage';
import SearchPage from './pages/SearchPage/SearchPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';

const App: React.FC = () => (
  <IonApp>
    <AppContextProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/recipelist" component={SearchResultsPage} exact={true} />
          <Route path="/listview" component={ListView} exact={true} />
          <Route path="/recipelist/:id" component={RecipeView} exact={true} />
          <Route path="/searchpage" component={SearchPage} exact={true} />
          <Route exact path="/" render={() => <Redirect to="/searchpage" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </AppContextProvider>
  </IonApp>
);

export default App;

import React, { useState, useContext } from 'react';
import './SearchPage.css';
import {AppContext } from '../../data/AppContext';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonSearchbar,
  IonPage,
  IonToolbar,
  IonFooter,
  IonList,
  IonItem
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { attachProps } from '@ionic/react/dist/types/components/utils';
import { setSearchText, loadRecipeData } from '../../data/recipes/recipes.actions';
import { connect } from '../../data/connect';

interface StateProps {
  id: string;
  history: any;
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
  loadRecipeData: typeof loadRecipeData;
}

type SearchPageProps = StateProps & DispatchProps;

const SearchPage: React.FC<SearchPageProps> = ({history, loadRecipeData }) => {

  const [IngredientText, setSearchText] = useState('');
  const { state, dispatch } = useContext(AppContext);


  const listOfIngredients: string[] = [];
  var paragraph:HTMLHeadingElement = document.getElementById('ingredientsList') as HTMLHeadingElement;
  var currentText:string="";
  var url:string="/home?inputs=peas";
  var searchButton:HTMLButtonElement = document.getElementById('searchButton') as HTMLButtonElement;

  //TODO: Move this to seperate tsx file
  //TODO: Account for invalid or blank inputs
  function addButton(){
    listOfIngredients.push(currentText)
    paragraph.innerText=(listOfIngredients.toString())
    // url=addTwoStrings("/home?inputs=","peas")
    // alert(url)
    // searchButton.setAttribute('href','/home')
    //TODO: Add code to clear searchbar when button is clicked
  }

  function addTwoStrings(s1:string,s2:string){
    return s1.concat(s2);
  }

  //TODO: Set inputs in search href to actual list of inputs
  return (
    <IonPage id="home-page">
      <IonHeader 
        translucent>
          <p>Input Ingredients</p>
        <IonSearchbar value={IngredientText} onIonChange={e => currentText=(e.detail.value!)}>
        </IonSearchbar>
      </IonHeader>


      <IonContent fullscreen>
      <div id = 'possibleSearches'>
        <IonList>
          <IonItem>Chicken</IonItem>
          <IonItem>Carrots</IonItem>
          <IonItem>Spinach</IonItem>
          <IonItem>Eggs</IonItem>
          <IonItem>Potatoes</IonItem>
        </IonList>
      </div>

      <div>
        <h5 id='ingredientsList'>Inputted ingredients go here</h5>
      </div>
      </IonContent>


      <IonFooter>
      <IonToolbar>
          <IonButtons>
          <IonButton onClick = {() => addButton()}>Add Ingredient</IonButton>
          <IonButton id="seachButton"
                      expand = "block" 
                      fill ="solid" 
                      shape ="round" 
                      size = "large" 
                      color ="success"  
                      onClick = { e => {
                          e.preventDefault();
                          loadRecipeData(listOfIngredients.toString());
                          history.push('/recipelist');
                        }
                      }
                      >
                        SEARCH
                      </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default connect<StateProps, DispatchProps>({
  mapDispatchToProps: {
    setSearchText,
    loadRecipeData
  },
  component: React.memo(SearchPage)
});

//export default SearchPage;

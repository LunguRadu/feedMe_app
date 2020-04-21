import React, { useState, useContext } from 'react';
import './SearchPage.css';
import {AppContext } from '../../data/AppContext';
import {possibleIngredients} from '../../data/possibleIngredients';
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
  IonItem,
  IonIcon,
  IonTabs, 
  IonTabBar, 
  IonTabButton,
  IonLabel,
  IonTitle,
  IonTab,
  IonRouterOutlet
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { attachProps } from '@ionic/react/dist/types/components/utils';
import { setSearchText, loadRecipeData } from '../../data/recipes/recipes.actions';
import { connect } from '../../data/connect';
import { playOutline } from 'ionicons/icons';

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


  var listOfIngredients: string[] = [];
  var paragraph:HTMLIonListElement = document.getElementById('ingredientsList') as HTMLIonListElement;
  var currentText:string="";
  var url:string=addTwoStrings("/home?inputs=",listOfIngredients.toString());
  var searchBar:HTMLIonSearchbarElement = document.getElementById('searchBar') as HTMLIonSearchbarElement;

  //TODO: Move this to seperate tsx file
  function addButton(){
    if(currentText===""){
      return 
    }
    else if (listOfIngredients.includes(currentText.toLowerCase().replace(/\s/g, ""))){
      return 
    }
    else if (possibleIngredients.includes(currentText.toLowerCase().replace(/\s/g, ""))){
    listOfIngredients.push(currentText.toLowerCase().replace(/\s/g, ""))
    paragraph.innerHTML=(
      listOfIngredients.toString()
      // {
      //     listOfIngredients.map((m)=>{
      //       for(var _i = 0; _i < listOfIngredients.length; _i++){
      //         return(
      //         <IonItem>{m}</IonItem>
      //         )
      //       }
      //     })
      //   } 
    )
    url=addTwoStrings("/home?inputs=",listOfIngredients.join().replace(/,/gi,"+").toString());
    var x:string=""
    setSearchText(x);
    return
    //TODO: ^ Fix code to clear searchbar when button is clicked
    }
    return
  }

  function enterEvent(){
    searchBar.addEventListener("keyup", ()=>{addButton()})
  }

  function clearList(){
    listOfIngredients = []
    url = "";
    currentText=""
    paragraph.innerHTML=("***")
    //TODO: Clear search bar
  }

  function removeOneIngredient(){
    listOfIngredients = []
    url = "";
    currentText=""
    // listOfIngredients.indexOf(ingredientToRemove)
  }

  function addTwoStrings(s1:string,s2:string){
    return s1.concat(s2);
  }

  function addFromScrollList(s:string){
    currentText=s
    addButton()
    currentText=""
  }

  return (
    
    <IonPage id="home-page">
      <IonHeader translucent>
      <br></br>
        <p>Select Ingredients:</p>
        <IonSearchbar placeholder = "type ingredients..."id = "searchBar" value={IngredientText} onIonChange={e => currentText=(e.detail.value!)} onIonFocus={()=>enterEvent()}>
        </IonSearchbar>
      </IonHeader>


      <IonContent>
      <div id = 'possibleSearches'>
        <IonList inset class="bg-transparent" lines="none">
          {
            possibleIngredients.map((n)=>{
              for(var _i = 0; _i < possibleIngredients.length; _i++){
                return(
                <IonItem><IonButton shape="round" size="small" fill ="clear" color="success" onClick={()=>addFromScrollList(n)}>{n}</IonButton></IonItem>
                )
              }
            })
          }
        </IonList>
      </div>
      </IonContent>


      <IonFooter translucent>
      <div>
        <h5>Your ingredients:</h5>
        <IonList id='ingredientsList'> ***
        </IonList>
      </div>

      <IonToolbar >
          <IonButtons>
          <IonButton onClick = {() => addButton()}>Add Ingredient</IonButton>
          <IonButton id="seach-button"     
                      onClick = { 
                          e => {
                          e.preventDefault();
                          loadRecipeData(listOfIngredients.toString());
                          history.push('/recipelist');
                        }
                      }
                      >
                        SEARCH
                      </IonButton>
          <IonButton 
          onClick = {
            e=>{
              clearList();
            }
          }
          >
            Clear
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


import React, { useState, useContext } from 'react';
import './SearchPage.css';
import {AppContext } from '../../data/AppContext';
import {possibleIngredients} from '../../data/ingredients/possibleIngredients';
import {listOfIngredients} from '../../data/ingredients/userIngredients';
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
  IonTabs
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

  var currentText:string="";
  var url:string=addTwoStrings("/home?inputs=",listOfIngredients.toString());
  var paragraph:HTMLIonListElement = document.getElementById('ingredientsList') as HTMLIonListElement;
  var searchBar:HTMLIonSearchbarElement = document.getElementById('searchBar') as HTMLIonSearchbarElement;

  //TODO: Move this to seperate tsx file
  function addButton(){
    if(currentText===""){
      return 
    }

    else if (listOfIngredients.includes(currentText.toLowerCase().replace(/\s/g, ""))){
      return 
    }

    // else if (possibleIngredients.includes(currentText.toLowerCase().replace(/\s/g, ""))){
    else{
    // setSearchText("");
    listOfIngredients.push(currentText.toLowerCase().replace(/\s/g, ""))
    paragraph.innerHTML=(
      listOfIngredients.toString().replace(/,/g, ", ")
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
    return
    }

    // return
  }

  function enterKeyPress(e:KeyboardEvent){
    if(e.keyCode===13){
      addButton();
    }
  }

  function enterEvent(){
    searchBar.addEventListener("keyup", (e)=>{enterKeyPress(e)})
  }

  function clearList(){
    for(var _i = 0; _i <= listOfIngredients.length; _i++){
      listOfIngredients.pop()
    }
    url = "";
    currentText=""
    paragraph.innerHTML=("***")
  }

  function removeOneIngredient(){
    // listOfIngredients = []
    // url = "";
    // currentText=""
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
       <IonHeader>
      <h1>#feedMe</h1>
      </IonHeader>
      <IonToolbar>
        <b>Select Ingredients:</b>
        <IonSearchbar placeholder = "type ingredients..."id = "searchBar" value={IngredientText} onIonChange={e => currentText=(e.detail.value!)} onIonFocus={()=>enterEvent()}>
        </IonSearchbar>
      </IonToolbar>


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
        <p>Your ingredients:</p>
        <IonList id='ingredientsList'> *** </IonList>
      </div>

      <IonToolbar >
          <IonButtons>
          <IonButton size="large" onClick = {() => addButton()}>Add Ingredient</IonButton>
          <IonButton size="large" class="seach-button"     
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
          <IonButton size="large"
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


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
  IonItem,
  IonIcon,
  IonRow,
  IonCol,
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
  var paragraph:HTMLHeadingElement = document.getElementById('ingredientsList') as HTMLHeadingElement;
  var currentText:string="";
  var url:string=addTwoStrings("/home?inputs=",listOfIngredients.toString());

  //TODO: Move this to seperate tsx file
  function addButton(){
    if(currentText===""){
      alert("Please type an ingredient")
      return null
    }
    else if (listOfIngredients.includes(currentText.toLowerCase().replace(/\s/g, ""))){
      alert("Already in the list")
      return null
    }
    else{
    listOfIngredients.push(currentText.toLowerCase().replace(/\s/g, ""))
    paragraph.innerText=(listOfIngredients.toString())
    url=addTwoStrings("/home?inputs=",listOfIngredients.join().replace(/,/gi,"+").toString());
    alert(url)
    var x:string=""
    setSearchText(x);
    //TODO: ^ Fix code to clear searchbar when button is clicked
    }
  }

  function clearList(){
    listOfIngredients = []
    url = "";
    currentText=""
    paragraph.innerText=("***")
    alert("list of ingredients cleared")
    //TODO: Clear search bar
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
        <p>Select Ingredients:</p>
         <IonRow>
           <IonCol>
        <IonSearchbar placeholder = "type ingredients..."id = "searchBar" color="light" value={IngredientText} onIonChange={e => currentText=(e.detail.value!)}></IonSearchbar>
          </IonCol>
        </IonRow>
      </IonToolbar>

      <IonContent>
      <div id = 'possibleSearches'>
        <IonList inset lines="full" >
          <IonButton fill="clear" onClick={()=>addFromScrollList("apples")}>Apples</IonButton>
          <IonItem> <IonIcon icon={playOutline}></IonIcon><IonButton shape="round" size="small" fill ="clear" color="success" onClick={()=>addFromScrollList("bananas")}>Bananas</IonButton></IonItem>
          <IonItem> <IonIcon icon={playOutline}></IonIcon><IonButton shape="round" size="small" fill ="clear" color="success" onClick={()=>addFromScrollList("carrots")}>Carrots</IonButton></IonItem>
          <IonItem> <IonIcon icon={playOutline}></IonIcon><IonButton shape="round" size="small" fill ="clear" color="success" onClick={()=>addFromScrollList("durians")}>Durians</IonButton></IonItem>
          <IonItem> <IonIcon icon={playOutline}></IonIcon><IonButton shape="round" size="small" fill ="clear" color="success" onClick={()=>addFromScrollList("eggs")}>Eggs</IonButton></IonItem>
          <IonItem> <IonIcon icon={playOutline}></IonIcon><IonButton shape="round" size="small" fill ="clear" color="success" onClick={()=>addFromScrollList("eggs")}>Eggs</IonButton></IonItem>
          <IonItem> <IonIcon icon={playOutline}></IonIcon><IonButton shape="round" size="small" fill ="clear" color="success" onClick={()=>addFromScrollList("eggs")}>Eggs</IonButton></IonItem>
          <IonItem> <IonIcon icon={playOutline}></IonIcon><IonButton shape="round" size="small" fill ="clear" color="success" onClick={()=>addFromScrollList("eggs")}>Eggs</IonButton></IonItem>
          <IonItem> <IonIcon icon={playOutline}></IonIcon><IonButton shape="round" size="small" fill ="clear" color="success" onClick={()=>addFromScrollList("eggs")}>Eggs</IonButton></IonItem>
          <IonItem> <IonIcon icon={playOutline}></IonIcon><IonButton shape="round" size="small" fill ="clear" color="success" onClick={()=>addFromScrollList("eggs")}>Eggs</IonButton></IonItem>
          {/* TODO: move a lot of the buttons' code to CSS file */}
        </IonList>
      </div>
      </IonContent>


      <IonFooter translucent>
      <div>
        <h5>Your ingredients:</h5>
        <h6 id='ingredientsList'>***</h6>
      </div>
      <IonToolbar >
          <IonButtons>
          <IonButton onClick = {() => addButton()}>Add Ingredient</IonButton>
          <IonButton class="seach-button"     
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


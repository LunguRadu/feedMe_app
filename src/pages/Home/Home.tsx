import React, { /*Component,*/ useState } from 'react';
import MessageListItem from '../ListView/ListView';
import { Ingredient, Recipe, getRecipes} from '../../data/recipes';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonBackButton
} from '@ionic/react';
import {
  useLocation
} from "react-router-dom";

import './Home.css';

const Home: React.FC = () => {
  console.log('Const Home Defined'); // temporary print statement check REMOVE!
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useIonViewWillEnter(() => {
    const msgs = getRecipes();
    setRecipes(msgs);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let inputs = useQuery().get("inputs");
  
  function fetchRecipes(ingredients: string | null){// API Function call
    console.log('Fetch recipes called!'); // temporary print statement check REMOVE!
    fetch('https://api.edamam.com/search?q=' + ingredients + '&app_id=12ef1ccd&app_key=c38b84d50a0fb09c60c7f64af6853958')
      .then(res => res.json())
      .then(
        (result) => {
          console.log('Found ' + result.count + ' recipes!');
          console.log('Here they are: ' + result.hits);
          console.log(result);

          var recipes: Recipe[] = [];

          result.hits.forEach(function (hit: any) {//loop to update the recipes shown in Listview to API results
            var hitIngredients: Ingredient[] = [];
            hit.recipe.ingredients.forEach(function (ingredient: any) {
              hitIngredients.push({
                text: hit.recipe.ingredients.text,
                weight: hit.recipe.ingredients.weight
              } as Ingredient)
            });
            var recipe: Recipe = {
              name: hit.recipe.label,
              image: hit.recipe.image,
              id: hit.recipe.uri,// use URL as ID because each is unique
              ingredientsLines: hit.recipe.ingredientLines,
              ingredients: hitIngredients,
              instructions: hit.recipe.url
            }
            recipes.push(recipe);// add induvidual recipe to recipes to be 'drawn'
          });
        },
        (error) => { //If an errors
          //Print error details to console
          console.error('Encountered an error: ' + error);
        }
      )
  }
  fetchRecipes(inputs);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>List of Recipes:</IonTitle>
  <IonTitle>Params: {inputs}</IonTitle>
          <IonBackButton text="Back to Search" defaultHref="/searchpage"></IonBackButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              List of Recipes:
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {recipes.map(r => <MessageListItem key={r.id} recipe={r} />)}
        </IonList>
        
      </IonContent>
    </IonPage>
  );
};

export default Home;
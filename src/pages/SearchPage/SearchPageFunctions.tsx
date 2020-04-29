//Adds new ingredient to listOfIngredients, displays it on the SearchPage
export function addButton(list:string[], url:string, currentText:string, inputList:HTMLIonListElement, searchBar:HTMLIonSearchbarElement){
    //Does nothing if there is no input
    if(currentText===""){
      return 
    }
    //Does nothing if the ingredient is already added
    else if (list.includes(currentText.toLowerCase().replace(/\s/g, ""))){
      return 
    }
    else{
    list.push(currentText.toLowerCase().replace(/\s/g, ""))
    inputList.innerText=inputList.innerText.replace("***","")    
    // list.toString().replace(/,/g, ", ") 
    var temp=document.createElement("IonButton")
    for(var _i = 0; _i < list.length; _i++){
      if(_i>0){
        temp.innerText=", " + list[_i].toString()
      }
      else{
        temp.innerText=list[_i].toString()
      }
      inputList.insertAdjacentElement('beforeend',temp as HTMLIonButtonElement)
    } 

    url=addTwoStrings("/home?inputs=",list.join().replace(/,/gi,"+").toString());

    //Clears SearchBar text
    clearSearchText(searchBar);
    return
    }
  }

//Clears SearchBar text
export function clearSearchText(searchBar:HTMLIonSearchbarElement){
  searchBar.value=""
}

//Appends string s2 to string s1
export function addTwoStrings(s1:string,s2:string){
    return s1.concat(s2);
}

//Calls the addButton method using a button, with button's text as the input
export function addFromScrollList(s:string, list:string[], url:string, currentText:string, inputList:HTMLIonListElement, searchBar:HTMLIonSearchbarElement){
    currentText=s
    addButton(list,url,currentText,inputList,searchBar)
    currentText=""
  }

//Deletes all items from listOfIngredients
export function clearList(list:string[], url:string, currentText:string, inputList:HTMLIonListElement){
    for(var _i = 0; _i <= list.length+1; _i++){
      list.pop()
    }
    url = "";
    currentText=""
    //Clears HTML rendering of listOfIngredients
    inputList.innerHTML=("***")
  }

//Calls addButton function if user focuses on SeachBar and presses Enter 
export function enterKeyPress(e:KeyboardEvent, list:string[], url:string, currentText:string, inputList:HTMLIonListElement, searchBar:HTMLIonSearchbarElement){
  //Only allows Enter Key to activate event
    if(e.keyCode===13){
      addButton(list,url,currentText,inputList, searchBar);
    }
  }

//Removes the most recent element from listOfIngredients
export function removeOneIngredient(list:string[], url:string, currentText:string, inputList:HTMLIonListElement){
    url = "";
    currentText=""
    list.pop();
    var shortenedListOfIngredients:string=list.toString().replace(/,/g, ", ")
    if(shortenedListOfIngredients===""){
      //If there was only one element, deletes HTML rendering of listOfIngredients
        inputList.innerHTML=("***")
    }
    else{
      //Refreshes HTML rendering of listOfIngredients
        inputList.innerHTML=(shortenedListOfIngredients)
    }
    }



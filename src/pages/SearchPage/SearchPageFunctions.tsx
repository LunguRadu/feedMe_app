export function addButton(list:string[], url:string, currentText:string, inputList:HTMLIonListElement, searchBar:HTMLIonSearchbarElement){
    if(currentText===""){
      return 
    }
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
    clearSearchText(searchBar);
    return
    }
  }

export function clearSearchText(searchBar:HTMLIonSearchbarElement){
  searchBar.value=""
}

export function addTwoStrings(s1:string,s2:string){
    return s1.concat(s2);
}

export function addFromScrollList(s:string, list:string[], url:string, currentText:string, inputList:HTMLIonListElement, searchBar:HTMLIonSearchbarElement){
    currentText=s
    addButton(list,url,currentText,inputList,searchBar)
    currentText=""
  }

export function clearList(list:string[], url:string, currentText:string, inputList:HTMLIonListElement){
    for(var _i = 0; _i <= list.length+1; _i++){
      list.pop()
    }
    url = "";
    currentText=""
    inputList.innerHTML=("***")
  }

export function enterKeyPress(e:KeyboardEvent, list:string[], url:string, currentText:string, inputList:HTMLIonListElement, searchBar:HTMLIonSearchbarElement){
    if(e.keyCode===13){
      addButton(list,url,currentText,inputList, searchBar);
    }
  }


export function enterEvent(searchBar:HTMLIonSearchbarElement, list:string[], url:string, currentText:string, inputList:HTMLIonListElement){
    searchBar.addEventListener("keyup", (e)=>{enterKeyPress(e, list, url, currentText, inputList, searchBar)})
  }


export function removeOneIngredient(list:string[], url:string, currentText:string, inputList:HTMLIonListElement){
    url = "";
    currentText=""
    list.pop();
    var shortenedListOfIngredients:string=list.toString().replace(/,/g, ", ")
    if(shortenedListOfIngredients===""){
        inputList.innerHTML=("***")
    }
    else{
        inputList.innerHTML=(shortenedListOfIngredients)
    }
    }



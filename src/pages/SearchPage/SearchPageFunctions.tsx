

export function addButton(list:string[], url:string, currentText:string, paragraph:HTMLIonListElement){
    if(currentText===""){
      return 
    }

    else if (list.includes(currentText.toLowerCase().replace(/\s/g, ""))){
      return 
    }

    // else if (possibleIngredients.includes(currentText.toLowerCase().replace(/\s/g, ""))){
    else{
    // setSearchText("");
    list.push(currentText.toLowerCase().replace(/\s/g, ""))
    paragraph.innerHTML=(
      list.toString().replace(/,/g, ", ")
    //   {
    //       listOfIngredients.map((m)=>{
    //         for(var _i = 0; _i < listOfIngredients.length; _i++){
    //           return(<IonItem>{m}</IonItem>)
    //         }
    //       })
    //     } 
    )
    url=addTwoStrings("/home?inputs=",list.join().replace(/,/gi,"+").toString());
    return
    }
  }

export function addTwoStrings(s1:string,s2:string){
    return s1.concat(s2);
}

export function addFromScrollList(s:string, list:string[], url:string, currentText:string, paragraph:HTMLIonListElement){
    currentText=s
    addButton(list,url,currentText,paragraph)
    currentText=""
  }

export function clearList(list:string[], url:string, currentText:string, paragraph:HTMLIonListElement){
    for(var _i = 0; _i <= list.length+1; _i++){
      list.pop()
    }
    url = "";
    currentText=""
    paragraph.innerHTML=("***")
  }

export function enterKeyPress(e:KeyboardEvent, list:string[], url:string, currentText:string, paragraph:HTMLIonListElement){
    if(e.keyCode===13){
      addButton(list,url,currentText,paragraph);
    }
  }


export function enterEvent(searchBar:HTMLIonSearchbarElement, list:string[], url:string, currentText:string, paragraph:HTMLIonListElement){
    searchBar.addEventListener("keyup", (e)=>{enterKeyPress(e, list, url, currentText, paragraph)})
  }


export function removeOneIngredient(list:string[], url:string, currentText:string, paragraph:HTMLIonListElement){
    url = "";
    currentText=""
    list.pop();
    var shortenedListOfIngredients:string=list.toString().replace(/,/g, ", ")
    if(shortenedListOfIngredients===""){
        paragraph.innerHTML=("***")
    }
    else{
        paragraph.innerHTML=(shortenedListOfIngredients)
    }
    }



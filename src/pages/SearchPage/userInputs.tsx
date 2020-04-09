import React, { useState } from 'react';

const userInputs: string[] = [];

export function addToUserInputs(s:string){
    //validation 
    userInputs.push(s);
}

export function test(){
    console.log("hello");
}

// export class userInputList{

//     addToUserInputs(input: string){
//         userInputs.push(input)
//     }

//     printUserInputs(){
//         console.log(userInputs)
//     }
// }
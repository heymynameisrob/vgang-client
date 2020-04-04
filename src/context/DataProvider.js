import React, { useState, useEffect, useContext } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AuthContext } from './AuthProvider';
const dayjs = require('dayjs');

export const DataContext = React.createContext();

function DataProvider(props) {
  const [suggested, setSuggested] = useState([]);
  const [fullRecipeInfo, setFullRecipeInfo] = useState([]);
  const [fullRecipeInstructions, setFullRecipeInstructions] = useState([]);
  const [challenge, setChallenge] = useState(null);

  const db = firebase.firestore();
  const Auth = useContext(AuthContext);
  const { uid } = Auth.userInfo;

  const getCurrentChallenge = async() => {
    try {
      const snapshot = await db.collection('users').doc(uid)
      .collection('challenges').doc('currentChallenge').get();              
    
      // Check if data exists and set state accordingly
      if(snapshot.data()) {
        setChallenge(snapshot.data());         
        return snapshot.data();       
      } 
      setChallenge({});  
      return false
      
    } catch (error) {
      return error
    }
  }

  const startChallenge = async(data) => {  
    try {
      const addNew = await db.collection('users').doc(uid).collection('challenges').doc('currentChallenge').set(data);            
      getCurrentChallenge();  
    }
    catch(error) {
      return error
    }
       
  }

  const pauseChallenge = (challengeId) => {}

  const completeChallenge = async () => {
    try {
      const current = await getCurrentChallenge();
      if(current) {
        const {id, endDate} = current
        let docNameDate = endDate.split(/\s+/).slice(1,3);
        const addNew = await db.collection('users').doc(uid).collection('challenges').doc(`${id}-${docNameDate[1]}-${docNameDate[0]}`).set(current);            
        const removeCurrent = await db.collection('users').doc(uid).collection('challenges').doc('currentChallenge').delete();            

        return `${id}-${docNameDate[1]}-${docNameDate[0]}`
      }
      return false
    }
    catch(error) {
      return error
    }
  }
  const getCompletedChallenge = async (id) => {
    try {
      const snapshot = await db.collection('users').doc(uid)
      .collection('challenges').doc(id).get();              
          
      if(snapshot.data()) {
        return snapshot.data()          
      }       
      return false      
    } catch (error) {
      return error
    }
  }


  const getFullRecipeInfo = async (id) => {    
    try {
      const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=4970d453899448e7b3245384b5e11823`, { cache: "force-cache" });
      const json = await res.json();
      setFullRecipeInfo(json);
    } catch (error) {
      console.error(error);
    }
  }

  const getFullRecipeInstructions = async(id) => {
    try {      
      const res = await fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?stepBreakdown=true&apiKey=4970d453899448e7b3245384b5e11823`, { cache: "force-cache" });
      const json = await res.json();
      setFullRecipeInstructions(json);
    } catch (error) {
      console.error(error);
    }    
  }
  const getSuggested = async (limit) => {
    let collectionLimit = limit || 6;
    try {
      const snapshot = await db.collection('recipes').limit(collectionLimit).get()
      setSuggested(snapshot.docs.map(doc => doc.data()));
    } catch (error) {
      return error
    }
  }
  
  return (
    <DataContext.Provider value={{
      fullRecipeInfo, suggested, fullRecipeInstructions, challenge,
      getFullRecipeInfo, getSuggested, getFullRecipeInstructions,
      getCurrentChallenge, startChallenge, completeChallenge, getCompletedChallenge 
    }} {...props} />
  )
}

const useData = () => React.useContext(DataContext)

export { DataProvider, useData }
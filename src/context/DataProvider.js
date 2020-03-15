import React, { useState, useEffect, useContext } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AuthContext } from './AuthProvider';

export const DataContext = React.createContext();

function DataProvider(props) {
  const [suggested, setSuggested] = useState([]);
  const [fullRecipeInfo, setFullRecipeInfo] = useState([]);
  const [fullRecipeInstructions, setFullRecipeInstructions] = useState([]);
  const [goals, setGoals] = useState([]);

  const db = firebase.firestore();
  const Auth = useContext(AuthContext);
  const { uid } = Auth.userInfo;

  const getGoals = async() => {
    try {
      const snapshot = await db.collection('users').doc(uid).collection('goals').get();      
      setGoals(snapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return { id, data }
      }));
    } catch (error) {
      return error
    }
  };

  const addGoal = (data) => {  
    db.collection('users').doc(uid).collection('goals').add(data)    
    .then(() => {getGoals()})    
    .catch(err => console.error(err.message));
  };
  
  const removeGoal = (docId) => {    
    db.collection('users').doc(uid).collection('goals').doc(docId).delete()
    .then(() => {getGoals()})
    .catch(err => console.log(err.message));
    
  };

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
      fullRecipeInfo, suggested, fullRecipeInstructions, goals,
      getFullRecipeInfo, getSuggested, getFullRecipeInstructions,
      getGoals, addGoal, removeGoal      
    }} {...props} />
  )
}

const useData = () => React.useContext(DataContext)

export { DataProvider, useData }
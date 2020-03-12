import React, { useState, useEffect, useContext } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AuthContext } from './AuthProvider';

export const DataContext = React.createContext();

function DataProvider(props) {
  const [recipeData, setRecipeData] = useState([]);
  const [userPantry, setUserPantry] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [fullRecipeInfo, setFullRecipeInfo] = useState([]);

  const db = firebase.firestore();
  const Auth = useContext(AuthContext);
  const { uid } = Auth.userInfo;

  const getFullRecipeInfo = async (id) => {
    console.log(id);
    try {
      const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=4970d453899448e7b3245384b5e11823`, { cache: "force-cache" });
      const json = await res.json();
      setFullRecipeInfo(json);
    } catch (error) {
      console.error(error);
    }
  }

  const getRecipes = async () => {
    try {
      const snapshot = await db.collection('recipes').get()
      setRecipeData(snapshot.docs.map(doc => doc.data()));
    } catch (error) {
      return error
    }
  }

  const getPantry = async () => {
    const docRef = db.collection('users').doc(uid);
    try {
      const getDoc = await docRef.get();
      const { pantry } = getDoc.data();
      setUserPantry(Object.keys(pantry).map(i => pantry[i])); // Converts to proper array      
    } catch (error) {
      return error
    }
  }

  const setPantry = (data) => {
    const docRef = db.collection('users').doc(uid);
    docRef.set({
      pantry: data
    }, { merge: true });
    console.log(data);
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
      fullRecipeInfo, recipeData, userPantry, suggested,
      getFullRecipeInfo, getSuggested, getRecipes, getPantry, setPantry
    }} {...props} />
  )
}

const useData = () => React.useContext(DataContext)

export { DataProvider, useData }
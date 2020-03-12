import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { LoadingSpinner } from '../components/Helpers';

export const AuthContext = React.createContext();
const provider = new firebase.auth.GoogleAuthProvider();

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [fetchingUserData, setFetchingUserData] = useState(true);

  // Get user Auth Status
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        setUserInfo({
          displayName,
          email,
          photoURL,
          uid
        });
        setIsLoggedIn(true);
        console.log(user);
      }
      setFetchingUserData(false);
    });
  }, []);

  if (fetchingUserData) {
    return <LoadingSpinner fixed={'fixed'} />
  }


  // Actions
  const login = () => {
    firebase.auth().signInWithRedirect(provider).then(res => {

    }).catch(err => {
      console.error(err.message);
    });
  }

  const logout = () => {
    firebase.auth().signOut().then(() => {
      setIsLoggedIn(false);
    }).catch(err => {
      console.error(err.message);
    });
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInfo, login, logout }} {...props} />
  )
}
const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth }
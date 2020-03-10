import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import App from './App';
import * as serviceWorker from './serviceWorker';

import AppProviders from './context/AppProviders';

import './index.css';

const API_KEY = process.env.REACT_APP_API_KEY;

// Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "vgang-pwa.firebaseapp.com",
  databaseURL: "https://vgang-pwa.firebaseio.com",
  projectId: "vgang-pwa",
  storageBucket: "vgang-pwa.appspot.com",
  messagingSenderId: "686662876387",
  appId: "1:686662876387:web:940156601ecc7a383319d6",
  measurementId: "G-12PDHX6DJH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

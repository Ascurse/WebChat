import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR1JJfGYRdHkMtUwElYY0cqvLTHTmuXKg",
  authDomain: "webchat-12222.firebaseapp.com",
  projectId: "webchat-12222",
  storageBucket: "webchat-12222.appspot.com",
  messagingSenderId: "515240803418",
  appId: "1:515240803418:web:b8bb8366643aeb0877ec63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const Context = createContext(null)

export const auth = getAuth(app)
export const firestore = getFirestore(app)


const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <>
    <Context.Provider value={{
    auth,
    firestore
  }}>
    <App />
  </Context.Provider>
  </>
);

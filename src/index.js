import React from 'react';
//import { initializeApp } from 'firebase/app'
import { initializeApp } from "firebase/app";
import ReactDOM from 'react-dom/client';
// import './index.css';
import './scss/styles.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartContextProvider } from './context/CartContext'

const firebaseConfig = {
  apiKey: "AIzaSyDZI6i960zJPDi8Bp3RCFxCN9ta5ZZtfmU",
  authDomain: "proyectofinalreact-add75.firebaseapp.com",
  projectId: "proyectofinalreact-add75",
  storageBucket: "proyectofinalreact-add75.appspot.com",
  messagingSenderId: "472009913588",
  appId: "1:472009913588:web:cd727fc7dc30f83d6a9aa1"
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <CartContextProvider>
    <App />
  </CartContextProvider>
  

    
  
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

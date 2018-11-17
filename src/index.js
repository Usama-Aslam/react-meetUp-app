import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { firebase } from './Config/firebase'

import { Provider } from "react-redux";
import { store, persistor } from './Redux/store'
import { connect } from "react-redux"

import { PersistGate } from 'redux-persist/integration/react'
// import * as firebase from 'firebase'

// var config = {
//     apiKey: "AIzaSyBrT1tgitCyiTJ5lwxMFIfsaoXjmL09-fQ",
//     authDomain: "reactmeetup-pk.firebaseapp.com",
//     databaseURL: "https://reactmeetup-pk.firebaseio.com",
//     projectId: "reactmeetup-pk",
//     storageBucket: "",
//     messagingSenderId: "130657948638"
// };

// firebase.initializeApp(config);


ReactDOM.render(
    // <Provider store={store}>
    //     <PersistGate loading={null} persistor={persistor}>
    //         <div className="App">
    //             <App />
    //         </div >
    //     </PersistGate>
    // </Provider>
    <App />
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
if (module.hot) { module.hot.accept() }

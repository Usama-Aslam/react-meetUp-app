import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { firebase } from './Config/firebase'
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


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
if (module.hot) { module.hot.accept() }

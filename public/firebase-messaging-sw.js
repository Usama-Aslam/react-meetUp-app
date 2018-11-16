importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyBrT1tgitCyiTJ5lwxMFIfsaoXjmL09-fQ",
    authDomain: "reactmeetup-pk.firebaseapp.com",
    databaseURL: "https://reactmeetup-pk.firebaseio.com",
    projectId: "reactmeetup-pk",
    storageBucket: "reactmeetup-pk.appspot.com",
    messagingSenderId: "130657948638"
};


firebase.initializeApp(config);

const messaging = firebase.messaging();

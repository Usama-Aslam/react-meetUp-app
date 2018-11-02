import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyBrT1tgitCyiTJ5lwxMFIfsaoXjmL09-fQ",
    authDomain: "reactmeetup-pk.firebaseapp.com",
    databaseURL: "https://reactmeetup-pk.firebaseio.com",
    projectId: "reactmeetup-pk",
    storageBucket: "reactmeetup-pk.appspot.com",
    messagingSenderId: "130657948638"
};

firebase.initializeApp(config);

export default firebase
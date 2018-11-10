import { duration } from "@material-ui/core/styles/transitions";
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

const pushData = (obj) => {
    console.log("obj", obj)
    const uid = firebase.auth().currentUser.uid;
    let newObj = {
        displayName: obj.displayName,
        email: obj.email,
        nickName: obj.nickName,
        phone: obj.phone,
        images: obj.images,
        location: obj.location,
        bev: obj.bev,
        duration: obj.durations,
        uid: uid,
        avatar: obj.avatar
    }
    firebase.database().ref("/").child(`Registration/${uid}`).set(newObj)
        .then((res) => {
            console.log("data is uploaded")
        })
    console.log("obj----", obj)
}

const getUsersData = () => {
    const uid = firebase.auth().currentUser.uid;
    firebase.database().ref(`Registration/`).on("child_added", data => {
        let obj = data.val()
        // console.log(obj)
        return obj
    })
}

const checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("currentUser Present")
        }
        else {
            //toast
            console.log("CurrentUser is not Present")
            this.props.history.replace("/")
        }
    })
}
export {
    firebase,
    pushData,
    getUsersData,
    checkAuth
}
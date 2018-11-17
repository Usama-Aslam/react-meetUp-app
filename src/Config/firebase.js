import { duration } from "@material-ui/core/styles/transitions";
import * as firebase from 'firebase'

import swal from 'sweetalert2'

var config = {
    apiKey: "AIzaSyAI2BdHq0THMGB-K2LNLVztV42wCOD390o",
    authDomain: "react-meetup-app.firebaseapp.com",
    databaseURL: "https://react-meetup-app.firebaseio.com",
    projectId: "react-meetup-app",
    storageBucket: "gs://react-meetup-app.appspot.com",
    messagingSenderId: "809547878890"
};


firebase.initializeApp(config);

// const initFirebase=()=>{
//     firebase.initializeApp({
//         messagingSenderId: "130657948638"
//     });
// }

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
const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: true,
    timer: 3000
});

const getUsersData = () => {
    const uid = firebase.auth().currentUser.uid;
    firebase.database().ref(`Registration/`).on("child_added", data => {
        let obj = data.val()
        // console.log(obj)
        return obj
    })
}

const firebaseLogout = () => {
    return firebase.auth().signOut()
        .then(() => {
            console.log("userSigned Out")
            toast({
                type: 'success',
                title: 'SignOut Successfully'
            })
            return true
        })
}

const getSpecificUsersData = (uid) => {
    // const uid = firebase.auth().currentUser.uid;
    return firebase.database().ref(`Registration/${uid}`).once("value", data => {
        let obj = data.val()
        // console.log(obj)
        return obj
    })
}

// const getMeetingData = (uid) => {
//     // const uid = firebase.auth().currentUser.uid;
//     return firebase.database().ref(`Data/${uid}/meeting`).on("child_added", data => {
//         let obj = data.val()
//         // console.log(obj)
//         return obj
//     })
// }

const pushMeetingData = async (sendObj, receiveObj, currentUserUid, clientUid) => {

    return await firebase.database().ref("/").child(`Data/${currentUserUid}/meeting/${clientUid}`).push(sendObj)
        .then((data) => {
            console.log("meeting requested")

            firebase.database().ref("/").child(`Data/${clientUid}/request/${currentUserUid}/${data.key}`).set(receiveObj)
                .then(() => {
                    toast({
                        type: 'success',
                        title: 'Invitation Sent Successfully'
                    })
                    return true

                })

                .catch((err) => console.log("error in receiving meeting", err))
            return true
        })
        .catch((err) => console.log("error in sending meeting"))
}

const checkAuth = () => {
    return firebase.auth().onAuthStateChanged((user) => {
        return "balls"
        // if (user) {
        //     console.log("currentUser Present")
        //     return true
        // }
        // else {
        //     //toast
        //     console.log("CurrentUser is not Present")
        //     this.props.history.replace("/")
        //     return false
        // }
    })
}

const firebaseFacebookLogin = (props) => {
    console.log('firebse props', props)
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
        'display': 'popup'
    });
    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user.toJSON();
            return user
        })
        .then((user) => {
            console.log(user)
            const uid = firebase.auth().currentUser.uid
            props.updateUser(user)
            //pushing data in registration
            firebase.database().ref("/Registration/").once("value", snapshot => {
                if (snapshot.hasChild(uid)) {
                    console.log('han')
                    //checking if the user already exist. if yes get to dashboard
                    props.history.replace(`/profile/dashboard/${uid}`)
                }
                else {
                    console.log('nahi')
                    //if user is not in registration get him to profile
                    props.history.replace("/profile")
                }
            })
        })
        .catch((e) => {
            // // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // // The email of the user's account used.
            // var email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
            // ...

            console.log(e)
        });
}
export {
    firebase,
    pushData,
    getUsersData,
    checkAuth,
    getSpecificUsersData,
    pushMeetingData,
    firebaseLogout,
    firebaseFacebookLogin
}
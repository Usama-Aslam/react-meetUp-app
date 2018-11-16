import { duration } from "@material-ui/core/styles/transitions";
import * as firebase from 'firebase'

import swal from 'sweetalert2'

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
    checkAuth,
    getSpecificUsersData,
    pushMeetingData,
    // getMeetingData
}
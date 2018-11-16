import { firebase } from './Config/firebase';

// navigator.serviceWorker
//     .register('serviceWorker.js')
//     .then((registration) => {
//         firebase.messaging().useServiceWorker(registration)
//     })

// const messaging = firebase.messaging();
// await messaging.requestPermission();
// const token = await messaging.getToken();
// console.log("token", token)
// return token
// .catch (e) {
//     console.error(e)
// }

export const askForPermissionToReceiveNotifications = async () => {
    try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();
        console.log("token", token)
        return token
    }
    catch (e) {
        console.error(e)
    }
}

export const messagePayLoad = async () => {
    try {
        const message = firebase.messaging()
        message.onMessage((payload) => {
            console.log("onMessage", payload)
        })
    }
    catch (e) {
        console.error(e)
    }
}
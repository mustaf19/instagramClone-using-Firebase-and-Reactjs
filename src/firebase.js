// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyBGDFZMDvKTMy2N8sGjKbqKcmpL7sxaOlA",
//     authDomain: "instagram-clone-a1731.firebaseapp.com",
//     projectId: "instagram-clone-a1731",
//     storageBucket: "instagram-clone-a1731.appspot.com",
//     messagingSenderId: "722820430452",
//     appId: "1:722820430452:web:f4be64dcc92073e47def21",
//     measurementId: "G-LX3CC8LCJH"
//   };
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBGDFZMDvKTMy2N8sGjKbqKcmpL7sxaOlA",
    authDomain: "instagram-clone-a1731.firebaseapp.com",
    projectId: "instagram-clone-a1731",
    storageBucket: "instagram-clone-a1731.appspot.com",
    messagingSenderId: "722820430452",
    appId: "1:722820430452:web:f4be64dcc92073e47def21",
    measurementId: "G-LX3CC8LCJH"

});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
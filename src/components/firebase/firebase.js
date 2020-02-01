import * as firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBNu3SqBQKkb1w4pYH1Sin9zUK0Rh1K5cs",
    authDomain: "drv-driving-experience.firebaseapp.com",
    databaseURL: "https://drv-driving-experience.firebaseio.com",
    projectId: "drv-driving-experience",
    storageBucket: "drv-driving-experience.appspot.com",
    messagingSenderId: "855821525898",
    appId: "1:855821525898:web:daf02e97ac8564f43e1e73",
    measurementId: "G-9NQP5X3RGC"
};

firebase.initializeApp(firebaseConfig);

export {firebase};

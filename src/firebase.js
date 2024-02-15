import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
 const firebaseConfig = {
    apiKey: "AIzaSyAYXx96qzur31yjTi_Eu3Cn2q8WpS1KZxk",
    authDomain: "oracaodeia.firebaseapp.com",
    databaseURL: "https://oracaodeia-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "oracaodeia",
    storageBucket: "oracaodeia.appspot.com",
    messagingSenderId: "183879549558",
    appId: "1:183879549558:web:ba00fcb3e47683e36e5557",
    measurementId: "G-HSVGWCGQK1"
};

export const app = initializeApp(firebaseConfig);
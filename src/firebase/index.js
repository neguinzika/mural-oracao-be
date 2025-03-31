
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqSLxNEN_OZkLO9sow7b3zMB73uPoUhIA",
    authDomain: "mural-oracao-be.firebaseapp.com",
    projectId: "mural-oracao-be",
    storageBucket: "mural-oracao-be.appspot.com",
    messagingSenderId: "1080880337769",
    appId: "1:1080880337769:web:01916c773ad0fb9e39e3f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}
















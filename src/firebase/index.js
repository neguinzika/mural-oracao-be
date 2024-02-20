
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: 'AIzaSyCY86i0Wonbt1ZpeWmpJ1NzNPXmKK8tqgM',
    authDomain: 'projeto-oracao.firebaseapp.com',
    projectId: 'projeto-oracao',
    storageBucket: 'projeto-oracao.appspot.com',
    messagingSenderId: '743445138565',
    appId: '1:743445138565:web:7dac3f5d3df7ca4bc0edec'
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export {
    db
}
















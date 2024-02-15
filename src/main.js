import './assets/main.css'
import {app} from "./firebase.js"
import {initializeApp} from "firebase/app";
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

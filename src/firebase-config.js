import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

console.log("process.env",process.env);
console.log("process.env.REACT_APP_FIREBASE_API_KEY",process.env.REACT_APP_FIREBASE_API_KEY);
const firebaseConfig = {
    apiKey: "AIzaSyA5g7QYzaLPCue6gVflcLlmkaj5GLneEm0",
    authDomain: "crudtut-72c48.firebaseapp.com",
    projectId: "crudtut-72c48",
    storageBucket: "crudtut-72c48.appspot.com",
    messagingSenderId: "148740476880",
    appId: "1:148740476880:web:fc096da7caef9ab58833d5",
    measurementId: "G-0X7CDDMEVP"
  };
  const app=initializeApp(firebaseConfig); 

  export const db=getFirestore(app); 
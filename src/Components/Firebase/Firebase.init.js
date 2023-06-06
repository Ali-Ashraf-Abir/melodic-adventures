// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYsBCbZj1rbBMb_pkF2AAClSPIu9kyrUs",
  authDomain: "melodic-adventures.firebaseapp.com",
  projectId: "melodic-adventures",
  storageBucket: "melodic-adventures.appspot.com",
  messagingSenderId: "727755557732",
  appId: "1:727755557732:web:219c25ebd7e7608a844871"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
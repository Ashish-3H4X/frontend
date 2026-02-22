// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "loginvirtuallearing.firebaseapp.com",
  projectId: "loginvirtuallearing",
  storageBucket: "loginvirtuallearing.appspot.com",
  messagingSenderId: "587144461524",
  appId: "1:587144461524:web:abc0d9f1ad27813b41cf41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 const auth = getAuth(app)
 const provider = new GoogleAuthProvider()

 export {auth ,provider}



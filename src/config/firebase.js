import { initializeApp } from "firebase/app";
import { browserLocalPersistence, createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcSvO_RA7xXqPRqWQ_4xL2Og37qJAKo3I",
  authDomain: "ziqing-quest-planner.firebaseapp.com",
  projectId: "ziqing-quest-planner",
  storageBucket: "ziqing-quest-planner.firebasestorage.app",
  messagingSenderId: "663904031635",
  appId: "1:663904031635:web:6ecb0d54f49a9484dcce66",
  measurementId: "G-KDW1LE8HRZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();

export const signUpWithGPopUp = () => signInWithPopup(auth, provider);  
export const signUpWEmail = async (email, password) => {
    if(!email || !password){
        alert('Please fill in your email and password');
        return;
    }

    return await createUserWithEmailAndPassword(auth, email, password);
}
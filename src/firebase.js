import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, TwitterAuthProvider, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB11n6SY0A3v-cMTqo7gDJKHdGC6CM2wJk",
    authDomain: "loopxpress-consumer.firebaseapp.com",
    projectId: "loopxpress-consumer",
    storageBucket: "loopxpress-consumer.firebasestorage.app",
    messagingSenderId: "949172926618",
    appId: "1:949172926618:web:69f06d8a45c0e940c38723"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

export { auth, googleProvider, twitterProvider, appleProvider };
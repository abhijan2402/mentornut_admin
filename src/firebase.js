import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyABdRckGF90i9eAQSI0jb3rCW-IHaLLtNg",
    authDomain: "mentornut-website.firebaseapp.com",
    projectId: "mentornut-website",
    storageBucket: "mentornut-website.appspot.com",
    messagingSenderId: "878209802822",
    appId: "1:878209802822:web:98b43899dcaff01c80a047",
    measurementId: "G-2Q329FVZGN"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
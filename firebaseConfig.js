// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyATZnbDNkxlQNl3BlN7W5Fjc5UApyON5Kc",
    authDomain: "superteam-15520.firebaseapp.com",
    projectId: "superteam-15520",
    storageBucket: "superteam-15520.firebasestorage.app",
    messagingSenderId: "289738838123",
    appId: "1:289738838123:web:25ae631bf8252baaa0212e",
    measurementId: "G-94D7LC85QW"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

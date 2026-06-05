
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAI8SNpZJ4qS4qT4mqWbhv3lrm3Bqitbkg",
  authDomain: "restaurant-app-b1a22.firebaseapp.com",
  projectId: "restaurant-app-b1a22",
  storageBucket: "restaurant-app-b1a22.firebasestorage.app",
  messagingSenderId: "1032550766707",
  appId: "1:1032550766707:web:602fd60a012dde5e59b206"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKa7ADRS8kxmTVhJfyYjYX2ax6QYmmRew",
  authDomain: "hopeful-hounds.firebaseapp.com",
  projectId: "hopeful-hounds",
  storageBucket: "hopeful-hounds.appspot.com",
  messagingSenderId: "150551764297",
  appId: "1:150551764297:web:5d779d5a7519bd2fc18e98",
  measurementId: "G-ZX7WBSMLMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app, analytics, auth};
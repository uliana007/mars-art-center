import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // ← добавь

const firebaseConfig = {
  apiKey: "AIzaSyB020SsnfGlFE-Azq50Kg3qvAehlsSRb3Q",
  authDomain: "my-mars-app.firebaseapp.com",
  projectId: "my-mars-app",
  storageBucket: "my-mars-app.firebasestorage.app",
  messagingSenderId: "49430824814",
  appId: "1:49430824814:web:ade59e9af27f3867cc637f",
  measurementId: "G-VJNG4NRWMR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // ← добавь

export { app, db };
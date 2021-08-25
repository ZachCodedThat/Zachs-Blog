import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyD4ZQlyVEy3ZvFKFqBJDNp6rHdH8KQAN44",
  authDomain: "zachs-blog-5c58e.firebaseapp.com",
  projectId: "zachs-blog-5c58e",
  storageBucket: "zachs-blog-5c58e.appspot.com",
  messagingSenderId: "637652420916",
  appId: "1:637652420916:web:f0d97d9e6d350cbad27d61",
  measurementId: "G-XHHMVGT1GD",
};
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}
const fire = firebase;
export default fire;

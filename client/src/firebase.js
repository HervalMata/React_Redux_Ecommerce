import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgBc373mTX_7MWCSotI5op3RSn7I5Pv4w",
    authDomain: "react-redux-ecommerce-58101.firebaseapp.com",
    databaseURL: "https://react-redux-ecommerce-58101.firebaseio.com",
    projectId: "react-redux-ecommerce-58101",
    storageBucket: "react-redux-ecommerce-58101.appspot.com",
    messagingSenderId: "774043539815",
    appId: "1:774043539815:web:4924dd7df8820f4ea937c2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
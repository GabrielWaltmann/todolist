import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";

export const firebaseConfig = {
    apiKey: "AIzaSyDGSmgg0DRMyqij2D1kmaJaTpb7kUS2J20",
    authDomain: "to-do-list-gabriel.firebaseapp.com",
    databaseURL: "https://to-do-list-gabriel-default-rtdb.firebaseio.com",
    projectId: "to-do-list-gabriel",
    storageBucket: "to-do-list-gabriel.appspot.com",
    messagingSenderId: "149369491980",
    appId: "1:149369491980:web:fa5176ad325df4d1579429"
  };
  
export const app = initializeApp(firebaseConfig);


  
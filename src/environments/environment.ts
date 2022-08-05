
import { initializeApp } from "firebase/app";

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyC_2r0xHPUcLqqZPyDiIU1CF4Z0E3r6CYc",
    authDomain: "get-strong-db.firebaseapp.com",
    databaseURL: "https://get-strong-db-default-rtdb.firebaseio.com",
    projectId: "get-strong-db",
    storageBucket: "get-strong-db.appspot.com",
    messagingSenderId: "1047329076634",
    appId: "1:1047329076634:web:3e579da424ea0c467e3623"
  }
};

const app = initializeApp(environment.firebase);


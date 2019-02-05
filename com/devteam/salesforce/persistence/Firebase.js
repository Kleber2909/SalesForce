import { Alert } from 'react-native';

import * as firebase from "firebase";

let app = firebase.initializeApp({
    apiKey: "AIzaSyCYdtMZJDJWDOrpqFvMr9SHVnP1io0nha0",
    authDomain: "salesforce-60123.firebaseapp.com",
    databaseURL: "https://salesforce-60123.firebaseio.com",
    projectId: "salesforce-60123",
    storageBucket: "salesforce-60123.appspot.com",
    messagingSenderId: "132920788526"
});

export const db = app.database();
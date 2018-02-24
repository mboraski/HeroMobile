import firebase from 'firebase';
import 'firebase/firestore';

const config = {
    apiKey: 'AIzaSyBEIuNlAAKU8byP2NUptaZTPtHobhYqMQA',
    authDomain: 'hasty-14d18.firebaseapp.com',
    databaseURL: 'https://hasty-14d18.firebaseio.com',
    projectId: 'hasty-14d18',
    storageBucket: 'hasty-14d18.appspot.com',
    messagingSenderId: '734280961973'
};

firebase.initializeApp(config);

const auth = firebase.auth();
const database = firebase.database();
const firestore = firebase.firestore();

export {
    auth,
    database,
    firestore
};

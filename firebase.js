import firebase from 'firebase';

require('firebase/firestore');
require('firebase/functions');

const config = {
    apiKey: 'AIzaSyBEIuNlAAKU8byP2NUptaZTPtHobhYqMQA',
    authDomain: 'hasty-14d18.firebaseapp.com',
    databaseURL: 'https://hasty-14d18.firebaseio.com',
    projectId: 'hasty-14d18',
    storageBucket: 'hasty-14d18.appspot.com',
    messagingSenderId: '734280961973'
};

try {
    firebase.initializeApp(config);
} catch (err) {
    console.error('Firebase initialization error: ', err);
}

export const fire = firebase;
export const rtdb = firebase.database();
export const firebaseAuth = firebase.auth();
// export const messaging = firebase.messaging();
export const db = firebase.firestore();
export const functions = firebase.functions();

// Disable deprecated features
db.settings({
    timestampsInSnapshots: true
});

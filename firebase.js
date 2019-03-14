import firebase from 'firebase';
import { testConfig, prodConfig } from './firebase-configs';

require('firebase/firestore');
require('firebase/functions');

const getConfig = env => (env === 'prod' ? prodConfig : testConfig);

try {
    firebase.initializeApp(getConfig(process.env.ENV));
} catch (err) {
    console.error('Firebase initialization error: ', err);
}

export const fire = firebase;
export const rtdb = firebase.database();
export const firebaseAuth = firebase.auth();
// export const messaging = firebase.messaging();
export const db = firebase.firestore();
export const functions = firebase.functions();
export const storage = fire.storage();

// Disable deprecated features
db.settings({
    timestampsInSnapshots: true
});

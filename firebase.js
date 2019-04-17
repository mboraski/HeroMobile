import firebase from 'firebase';
import { Constants } from 'expo';
import { prodConfig } from './firebase-configs';

require('firebase/firestore');
require('firebase/functions');

const getConfig = env => (env === 'prod-v1' ? prodConfig : prodConfig);

try {
    firebase.initializeApp(getConfig(Constants.manifest.releaseChannel));
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

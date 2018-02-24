// import { Permissions, Notifications } from 'expo';
// import { AsyncStorage } from 'react-native';
// import axios from 'axios';
//
// const BASE_ENDPOINT = 'https://us-central1-hasty-14d18.cloudfunctions.net';
// const PUSH_ENDPOINT = 'savePushToken';
//
// export default async () => {
//   let previousToken = await AsyncStorage.getItem('pushtoken');
//   console.log('previous push notification token', previousToken);
//   if (previousToken) {
//     console.log('previous push notification token in if', previousToken);
//     return;
//   } else {
//     let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
//
//     if (status !== 'granted') {
//       return;
//     }
//
//     let token = await Notifications.getExponentPushTokenAsync();
//     console.log('previous push notification token in else', previousToken);
//     // await axios.post(`${BASE_ENDPOINT}/${PUSH_ENDPOINT}`, { token: { token } });
//     AsyncStorage.setItem('pushtoken', token);
//   }
// };

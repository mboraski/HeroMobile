import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

const ACTIONS = {
    FACEBOOK_LOGIN_SUCCESS: 'facebook_login_success',
    FACEBOOK_LOGIN_FAIL: 'facebook_login_fail'
};

/** Helper Functions **/
const doFacebookLogin = async dispatch => {
    try {
        const response = await Facebook.logInWithReadPermissionsAsync('1873998396207588', {
            permissions: ['public_profile', 'email', 'user_friends']
        });
        console.log('fb auth response ', response);
        const { type, token } = response;
        if (type === 'cancel') {
            return dispatch({ type: ACTIONS.FACEBOOK_LOGIN_FAIL });
        }
        await AsyncStorage.setItem('fb_token', token);
        dispatch({ type: ACTIONS.FACEBOOK_LOGIN_SUCCESS, payload: token });
    } catch (error) {
        console.log('doFacebookLogin catch: ', error);
    }
};
/** Helper Functions End **/

const facebookLogin = () => async dispatch => {
    const token = await AsyncStorage.getItem('fb_token');

    if (token) {
        console.log('fb_token', token);
        dispatch({ type: ACTIONS.FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
        doFacebookLogin(dispatch);
    }
};

const ACTION_CREATORS = {
    facebookLogin
};

export default { ...ACTIONS, ...ACTION_CREATORS };

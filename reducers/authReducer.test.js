import configureStore from 'redux-mock-store';

import { facebookLogin } from '../actions/authActions';
import { FACEBOOK_LOGIN_SUCCESS } from '../actions/types';
import auth from './authReducer';

describe('Testing Auth Reducer', () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    const initialState = {};
    const store = mockStore(initialState);

    // clear stored actions
    beforeEach(() => {
        store.clearActions();
    });

    it('action example', async () => {
        // dispatch action
        await store.dispatch(facebookLogin());
        // get actions in store
        const actions = store.getActions();
        // can check with snapshot
        expect(actions).toMatchSnapshot();
        // or check directly
        // expect(actions).toEqual([expectedPayload])
    });

    it('reducer example', () => {
        const mockAuthObject = {};
        expect(auth(mockAuthObject, { type: 'facebook_login_success' })).toMatchSnapshot();
    });
});

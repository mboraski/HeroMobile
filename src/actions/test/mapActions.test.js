import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { saveAddress, setRegion, getCurrentLocation } from '../mapActions';
import mockApi from '../../mocks/googleMapsApi';

jest.mock('expo', () => ({
    Permissions: {
        askAsync: jest.fn(() => ({ status: 'granted' }))
    },
    Location: {
        getCurrentPositionAsync: jest.fn(
            () => new Promise(resolve => resolve({ coords: { latitude: 0, longitude: 1 } }))
        )
    }
}));

describe('mapActions', () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const initialState = {};
    const store = mockStore(initialState);

    beforeEach(() => {
        store.clearActions();
        mockApi.reset();
    });

    it('saveAddress', async () => {
        mockApi.onAny().reply(200, { data: 'data' });
        await store.dispatch(saveAddress('address'));
        const actions = store.getActions();
        expect(actions).toMatchSnapshot();
    });
    it('setRegion', async () => {
        mockApi.onAny().reply(200, { data: 'data' });
        await store.dispatch(setRegion({ latitude: 0, longitude: 0 }));
        const actions = store.getActions();
        expect(actions).toMatchSnapshot();
    });
    it('getCurrentLocation', async () => {
        mockApi.onAny().reply(200, { data: 'data' });
        expect(getCurrentLocation()).toMatchSnapshot();
        await store.dispatch(getCurrentLocation());
        const actions = store.getActions();
        expect(actions).toMatchSnapshot();
    });
});

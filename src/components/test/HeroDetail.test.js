import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import HeroDetail from '../HeroDetail';

const initialState = {};

const hero = {
    id: 1,
    name: 'Jessica Morgan',
    type: 'Instant',
    delivery_time: 4,
    image: 'https://facebook.github.io/react/img/logo_og.png'
};

describe('HeroDetail', () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    it('renders correctly', () => {
        const wrapper = shallow(<HeroDetail hero={hero} />, {
            context: { store: mockStore(initialState) }
        });
        const render = wrapper.dive();
        expect(render).toMatchSnapshot();
    });
});

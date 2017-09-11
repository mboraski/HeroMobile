import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import HeroMainScreen from './HeroMainScreen';

const initialState = {};

describe('HeroMainScreen', () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    it('renders correctly', () => {
        const wrapper = shallow(<HeroMainScreen />, {
            context: { store: mockStore(initialState) }
        });
        const render = wrapper.dive();
        expect(render).toMatchSnapshot();
    });
});

import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import LocationButton from './LocationButton';

const initialState = {};

describe('LocationButton', () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    it('renders correctly', () => {
        const wrapper = shallow(<LocationButton />, {
            context: { store: mockStore(initialState) }
        });
        const render = wrapper.dive();
        expect(render).toMatchSnapshot();
    });
});

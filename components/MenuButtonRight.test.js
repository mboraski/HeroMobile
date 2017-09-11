import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import MenuButtonRight from './MenuButtonRight';

const initialState = {};

describe('MenuButtonRight', () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    it('renders correctly', () => {
        const wrapper = shallow(<MenuButtonRight />, {
            context: { store: mockStore(initialState) }
        });
        const render = wrapper.dive();
        expect(render).toMatchSnapshot();
    });
});

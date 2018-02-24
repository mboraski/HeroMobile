import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import OrderDetail from '../OrderDetail';

const initialState = {};

const order = {
    name: 'Nike Air Max',
    price: 99.99,
    delivery_type: 'Instant',
    thumbnail_image: 'https://facebook.github.io/react/img/logo_og.png'
};

describe('OrderDetail', () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    it('renders correctly', () => {
        const wrapper = shallow(<OrderDetail order={order} />, {
            context: { store: mockStore(initialState) }
        });
        const render = wrapper.dive();
        expect(render).toMatchSnapshot();
    });
});

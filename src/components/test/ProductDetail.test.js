import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ProductDetail from '../ProductDetail';

const initialState = {};

const product = {
    title: 'Redbull',
    thumbnail_image: 'https://facebook.github.io/react/img/logo_og.png',
    price: '$3.49'
};

describe('ProductDetail', () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    it('renders correctly', () => {
        const wrapper = shallow(<ProductDetail product={product} />, {
            context: { store: mockStore(initialState) }
        });
        const render = wrapper.dive();
        expect(render).toMatchSnapshot();
    });
});

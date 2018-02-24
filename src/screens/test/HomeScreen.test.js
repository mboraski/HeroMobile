import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import { HomeScreen } from '../HomeScreen';

describe('HomeScreen', () => {
    it('renders correctly', () => {
        const props = {
            products: [
                {
                    quantity: 1,
                    title: 'Type 1 code 1',
                    thumbnail_image: 'image',
                    price: '$3.49'
                }
            ],
            cart: {
                totalProducts: 0
            },
            header: {
                isMenuOpen: false
            }
        };
        const render = shallow(<HomeScreen {...props} />);
        expect(render).toMatchSnapshot();
    });
});

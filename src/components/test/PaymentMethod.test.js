import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import PaymentMethod from '../PaymentMethod';

describe('PaymentMethod', () => {
    it('renders correctly', () => {
        const render = shallow(<PaymentMethod />);
        expect(render).toMatchSnapshot();
    });
});

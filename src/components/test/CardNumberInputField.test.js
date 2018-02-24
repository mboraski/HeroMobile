import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import CardNumberInputField from '../TextInputField';

describe('CardNumberInputField', () => {
    it('renders correctly', () => {
        const render = shallow(<CardNumberInputField />);
        expect(render).toMatchSnapshot();
    });
});

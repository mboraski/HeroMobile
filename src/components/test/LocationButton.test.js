import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import LocationButton from '../LocationButton';

describe('LocationButton', () => {
    it('renders correctly', () => {
        const render = shallow(<LocationButton />);
        expect(render).toMatchSnapshot();
    });
});

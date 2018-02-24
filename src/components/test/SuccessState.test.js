import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import SuccessState from '../SuccessState';

describe('SuccessState', () => {
    it('renders correctly', () => {
        const render = shallow(<SuccessState />);
        expect(render).toMatchSnapshot();
    });
});

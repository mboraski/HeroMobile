import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import SectionTitle from '../SectionTitle';

describe('SectionTitle', () => {
    it('renders correctly', () => {
        const render = shallow(<SectionTitle />);
        expect(render).toMatchSnapshot();
    });
});

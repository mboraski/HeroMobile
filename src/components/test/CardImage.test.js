import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import CardImage from '../CardImage';

describe('CardImage', () => {
    it('renders correctly', () => {
        const render = shallow(<CardImage />);
        expect(render).toMatchSnapshot();
    });
});

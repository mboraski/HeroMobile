import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import { HeroList } from '../HeroList';

describe('HeroList', () => {
    it('renders correctly', () => {
        const render = shallow(<HeroList />);
        expect(render).toMatchSnapshot();
    });
});

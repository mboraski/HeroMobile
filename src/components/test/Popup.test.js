import React from 'react';
import 'react-native';
import { shallow } from 'enzyme';
import Component from '../Popup';

describe('Popup', () => {
    it('renders correctly', () => {
        const render = shallow(<Component />);
        expect(render).toMatchSnapshot();
    });
});

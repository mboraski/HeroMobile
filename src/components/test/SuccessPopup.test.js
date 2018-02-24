import React from 'react';
import 'react-native';
import { shallow } from 'enzyme';
import SuccessPopup from '../SuccessPopup';

describe('SuccessPopup', () => {
    it('renders correctly', () => {
        const render = shallow(<SuccessPopup openModal closeModal={() => {}} />);
        expect(render).toMatchSnapshot();
    });
});

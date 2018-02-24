import React from 'react';
import 'react-native';
import { shallow } from 'enzyme';
import Component from '../Prediction';

describe('Prediction', () => {
    it('renders correctly', () => {
        const props = {
            prediction: {
                description: 'description'
            }
        };
        const render = shallow(<Component {...props} />);
        expect(render).toMatchSnapshot();
    });
});

import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ShareButton from '../ShareButton';
import Color from '../../constants/Color';

const initialState = {};
const style = {
    borderColor: Color.BLACK,
    borderWidth: 1
};
const source = '../assets/icons/instagram.png';

describe('ShareButton', () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    it('renders correctly', () => {
        const wrapper = shallow(<ShareButton style={style} source={source} />, {
            context: { store: mockStore(initialState) }
        });
        const render = wrapper.dive();
        expect(render).toMatchSnapshot();
    });
});

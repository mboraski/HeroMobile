import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import { FeedbackScreen } from '../FeedbackScreen';

describe('FeedbackScreen', () => {
    it('renders correctly', () => {
        const props = {
            name: 'Jessica',
            numProducts: 1,
            feedbackFormVisible: true
        };
        const render = shallow(<FeedbackScreen {...props} />);
        expect(render).toMatchSnapshot();
    });
});

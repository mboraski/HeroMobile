import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import DeliveryNotesForm from '../DeliveryNotesForm';

describe('DeliveryNotesForm', () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    it('renders correctly', () => {
        const initialState = {
            checkout: { notes: 'notes' }
        };
        const props = {
            anyTouched: false,
            pending: false,
            submitting: false,
            asyncValidating: false,
            invalid: false,
            pristine: true,
            fields: {
                notes: {
                    value: 'notes',
                    touched: false,
                    error: null
                }
            }
        };
        const wrapper = shallow(<DeliveryNotesForm {...props} />, {
            context: { store: mockStore(initialState) }
        });
        const render = wrapper.dive();
        expect(render).toMatchSnapshot();
    });
});

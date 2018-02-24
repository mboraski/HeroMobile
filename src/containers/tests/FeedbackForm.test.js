import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { FeedbackForm } from '../FeedbackForm';

describe('FeedbackForm', () => {
    it('should render correctly', () => {
        const props = {
            anyTouched: false,
            pending: false,
            submitting: false,
            asyncValidating: false,
            invalid: false,
            pristine: true,
            fields: {
                name: {
                    value: '',
                    touched: false,
                    error: null
                }
            }
        };
        const render = shallow(<FeedbackForm {...props} />);
        expect(render).toMatchSnapshot();
    });
    it('should render correctly with untouched disabled', () => {
        const props = {
            anyTouched: false,
            pending: false,
            submitting: false,
            asyncValidating: false,
            invalid: true,
            pristine: false,
            fields: {
                name: {
                    value: '',
                    touched: false,
                    error: null
                }
            }
        };
        const render = shallow(<FeedbackForm {...props} />);
        expect(render).toMatchSnapshot();
    });
    it('should render correctly with error', () => {
        const props = {
            anyTouched: true,
            pending: false,
            submitting: false,
            asyncValidating: false,
            invalid: true,
            pristine: false,
            fields: {
                name: {
                    value: '',
                    touched: true,
                    error: 'error'
                }
            }
        };
        const render = shallow(<FeedbackForm {...props} />);
        expect(render).toMatchSnapshot();
    });
    it('should render correctly with submitting', () => {
        const props = {
            anyTouched: true,
            pending: false,
            submitting: true,
            asyncValidating: false,
            invalid: false,
            pristine: false,
            fields: {
                name: {
                    value: '',
                    touched: false,
                    error: null
                }
            }
        };
        const render = shallow(<FeedbackForm {...props} />);
        expect(render).toMatchSnapshot();
    });
    it('should render correctly with submitSuccess', () => {
        const props = {
            anyTouched: true,
            pending: false,
            submitting: false,
            submitSucceeded: true,
            asyncValidating: false,
            invalid: false,
            pristine: false,
            fields: {
                name: {
                    value: '',
                    touched: false,
                    error: null
                }
            }
        };
        const render = shallow(<FeedbackForm {...props} />);
        expect(render).toMatchSnapshot();
    });
});

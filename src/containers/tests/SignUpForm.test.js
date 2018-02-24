import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    it('should render correctly', () => {
        const initialState = {
            auth: {}
        };
        const props = {
            anyTouched: false,
            pending: false,
            submitting: false,
            asyncValidating: false,
            invalid: false,
            pristine: true,
            fields: {
                email: {
                    value: '',
                    touched: false,
                    error: null
                },
                password: {
                    value: '',
                    touched: false,
                    error: null
                }
            },
            handleSubmit: jest.fn(),
            actions: {}
        };
        const render = shallow(<SignUpForm {...props} />, {
            context: { store: mockStore(initialState) }
        });
        expect(render).toMatchSnapshot();
    });
    it('should render correctly with untouched disabled', () => {
        const initialState = {
            auth: {}
        };
        const props = {
            anyTouched: false,
            pending: false,
            submitting: false,
            asyncValidating: false,
            invalid: true,
            pristine: false,
            fields: {
                email: {
                    value: '',
                    touched: false,
                    error: null
                },
                password: {
                    value: '',
                    touched: false,
                    error: null
                }
            },
            handleSubmit: jest.fn(),
            actions: {}
        };
        const render = shallow(<SignUpForm {...props} />, {
            context: { store: mockStore(initialState) }
        });
        expect(render).toMatchSnapshot();
    });
    it('should render correctly with error', () => {
        const initialState = {
            auth: {}
        };
        const props = {
            anyTouched: true,
            pending: false,
            submitting: false,
            asyncValidating: false,
            invalid: true,
            pristine: false,
            fields: {
                email: {
                    value: '',
                    touched: true,
                    error: 'error'
                },
                password: {
                    value: '',
                    touched: false,
                    error: null
                }
            },
            handleSubmit: jest.fn(),
            actions: {}
        };
        const render = shallow(<SignUpForm {...props} />, {
            context: { store: mockStore(initialState) }
        });
        expect(render).toMatchSnapshot();
    });
    it('should render correctly with submitting', () => {
        const initialState = {
            auth: {}
        };
        const props = {
            anyTouched: true,
            pending: false,
            submitting: true,
            asyncValidating: false,
            invalid: false,
            pristine: false,
            fields: {
                email: {
                    value: '',
                    touched: false,
                    error: null
                },
                password: {
                    value: '',
                    touched: false,
                    error: null
                }
            },
            handleSubmit: jest.fn(),
            actions: {}
        };
        const render = shallow(<SignUpForm {...props} />, {
            context: { store: mockStore(initialState) }
        });
        expect(render).toMatchSnapshot();
    });
    it('should render correctly with submitSuccess', () => {
        const initialState = {
            auth: {}
        };
        const props = {
            anyTouched: true,
            pending: false,
            submitting: false,
            submitSucceeded: true,
            asyncValidating: false,
            invalid: false,
            pristine: false,
            fields: {
                email: {
                    value: '',
                    touched: false,
                    error: null
                },
                password: {
                    value: '',
                    touched: false,
                    error: null
                }
            },
            handleSubmit: jest.fn(),
            actions: {}
        };
        const render = shallow(<SignUpForm {...props} />, {
            context: { store: mockStore(initialState) }
        });
        expect(render).toMatchSnapshot();
    });
});

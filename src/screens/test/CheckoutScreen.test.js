import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';

import { CheckoutScreen } from '../CheckoutScreen';
import { getCartOrders } from '../../selectors/cartSelectors';

describe('CheckoutScreen', () => {
    it('renders correctly', () => {
        const cart = {
            products: {},
            totalCost: 0,
            totalQuantity: 0
        };
        const state = { cart };
        const props = {
            cart,
            orders: getCartOrders(state),
            totalCost: cart.totalCost,
            totalQuantity: cart.totalQuantity,
            notes: 'notes',
            latlon: {
                lat: 0,
                lon: 1
            }
        };
        const render = shallow(<CheckoutScreen {...props} />);
        expect(render).toMatchSnapshot();
    });
    it('renders correctly with products', () => {
        const cart = {
            products: {
                1: {
                    1: {
                        deliveryType: '1',
                        price: 3.49,
                        productCode: '1',
                        quantity: 1,
                        thumbnail_image: 'image',
                        title: 'Type 1 code 1'
                    }
                }
            },
            totalCost: 3.49,
            totalQuantity: 1
        };
        const state = { cart };
        const props = {
            cart,
            orders: getCartOrders(state),
            totalCost: cart.totalCost,
            totalQuantity: cart.totalQuantity,
            notes: 'notes',
            latlon: {
                lat: 0,
                lon: 1
            }
        };
        const render = shallow(<CheckoutScreen {...props} />);
        expect(render).toMatchSnapshot();
    });
    it('shows remove order popup for order quantity === 1', () => {
        const cart = {
            products: {
                1: {
                    1: {
                        deliveryType: '1',
                        price: 3.49,
                        productCode: '1',
                        quantity: 1,
                        thumbnail_image: 'image',
                        title: 'Type 1 code 1'
                    }
                }
            },
            totalCost: 3.49,
            totalQuantity: 1
        };
        const state = { cart };
        const props = {
            cart,
            orders: getCartOrders(state),
            totalCost: cart.totalCost,
            totalQuantity: cart.totalQuantity,
            notes: 'notes',
            latlon: {
                lat: 0,
                lon: 1
            }
        };
        const removeFromCart = jest.fn();
        const render = shallow(<CheckoutScreen {...props} removeFromCart={removeFromCart} />);
        const instance = render.instance();
        const order = props.cart.products[1][1];
        instance.handleRemoveOrder(order);
        expect(render.state()).toMatchSnapshot();
        expect(removeFromCart.mock.calls.length).toEqual(0);
        instance.removeOrderConfirmed(true);
        expect(render.state()).toMatchSnapshot();
        expect(removeFromCart.mock.calls.length).toEqual(1);
    });
    it('removes order from cart for quantity > 1', () => {
        const cart = {
            products: {
                1: {
                    1: {
                        deliveryType: '1',
                        price: 3.49,
                        productCode: '1',
                        quantity: 2,
                        thumbnail_image: 'image',
                        title: 'Type 1 code 1'
                    }
                }
            },
            totalCost: 3.49,
            totalQuantity: 1
        };
        const state = { cart };
        const props = {
            cart,
            orders: getCartOrders(state),
            totalCost: cart.totalCost,
            totalQuantity: cart.totalQuantity,
            notes: 'notes',
            latlon: {
                lat: 0,
                lon: 1
            }
        };
        const removeFromCart = jest.fn();
        const render = shallow(<CheckoutScreen {...props} removeFromCart={removeFromCart} />);
        const instance = render.instance();
        const order = props.cart.products[1][1];
        instance.handleRemoveOrder(order);
        expect(removeFromCart.mock.calls.length).toEqual(1);
    });
    it('changeLocation & changeLocationConfirmed', () => {
        const cart = {
            products: {},
            totalCost: 0,
            totalQuantity: 0
        };
        const state = { cart };
        const props = {
            cart,
            orders: getCartOrders(state),
            totalCost: cart.totalCost,
            totalQuantity: cart.totalQuantity,
            notes: 'notes',
            latlon: {
                lat: 0,
                lon: 1
            },
            navigation: {
                dispatch: jest.fn()
            }
        };
        const render = shallow(<CheckoutScreen {...props} />);
        const instance = render.instance();
        instance.changeLocation();
        expect(render.state()).toMatchSnapshot();
        instance.changeLocationConfirmed();
        expect(render.state()).toMatchSnapshot();
        instance.changeLocation();
        instance.changeLocationConfirmed(true);
        expect(render.state()).toMatchSnapshot();
        expect(props.navigation.dispatch.mock.calls.length).toEqual(1);
    });
});

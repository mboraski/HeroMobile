import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import { CartScreen } from '../CartScreen';

describe('CartScreen', () => {
    it('shows remove order popup for order quantity === 1', () => {
        const initialState = {
            cart: {
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
            }
        };
        const removeFromCart = jest.fn();
        const render = shallow(
            <CartScreen {...initialState} {...initialState.cart} removeFromCart={removeFromCart} />
        );
        expect(render).toMatchSnapshot();
        const order = initialState.cart.products[1][1];
        render.instance().handleRemoveOrder(order);
        expect(render.state()).toMatchSnapshot();
        expect(removeFromCart.mock.calls.length).toEqual(0);
        render.instance().removeOrderConfirmed(true);
        expect(render.state()).toMatchSnapshot();
        expect(removeFromCart.mock.calls.length).toEqual(1);
    });
    it('removes order from cart for quantity > 1', () => {
        const initialState = {
            cart: {
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
                totalCost: 6.98,
                totalQuantity: 2
            }
        };
        const removeFromCart = jest.fn();
        const render = shallow(
            <CartScreen {...initialState} {...initialState.cart} removeFromCart={removeFromCart} />
        );
        expect(render).toMatchSnapshot();
        const order = initialState.cart.products[1][1];
        render.instance().handleRemoveOrder(order);
        expect(removeFromCart.mock.calls.length).toEqual(1);
    });
});

import {
    GET_PRODUCTS_BY_ADDRESS_REQUEST,
    GET_PRODUCTS_BY_ADDRESS_SUCCESS,
    GET_PRODUCTS_BY_ADDRESS_FAIL,
    selectDeliveryType
} from '../../actions/productActions';
import reducer, { initialState } from '../productReducer';

describe('productReducer', () => {
    it('handles selectDeliveryType action', () => {
        expect(reducer(initialState, selectDeliveryType('deliveryType'))).toMatchSnapshot();
    });

    it('handles GET_PRODUCTS_BY_ADDRESS_REQUEST action', () => {
        expect(reducer(initialState, { type: GET_PRODUCTS_BY_ADDRESS_REQUEST })).toMatchSnapshot();
    });

    it('handles GET_PRODUCTS_BY_ADDRESS_SUCCESS action', () => {
        expect(
            reducer(initialState, {
                type: GET_PRODUCTS_BY_ADDRESS_SUCCESS,
                payload: {
                    productList: {
                        1: {
                            1: {}
                        }
                    }
                }
            })
        ).toMatchSnapshot();
    });

    it('handles GET_PRODUCTS_BY_ADDRESS_FAIL action', () => {
        expect(
            reducer(initialState, {
                type: GET_PRODUCTS_BY_ADDRESS_FAIL,
                error: new Error('error')
            })
        ).toMatchSnapshot();
    });
});

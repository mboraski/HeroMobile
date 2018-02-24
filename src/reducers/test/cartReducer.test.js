import { addToCart, removeFromCart, setCurrentLocation } from '../../actions/cartActions';
import reducer, { initialState } from '../cartReducer';

describe('cartReducer', () => {
    it('handles addToCart action', () => {
        const product = {
            quantity: 1,
            title: 'Type 1 code 1',
            thumbnail_image: 'image',
            price: '$3.49',
            productCode: '1',
            deliveryType: '1'
        };
        expect(reducer(initialState, addToCart(product))).toMatchSnapshot();
    });
    it('handles removeFromCart action', () => {
        const product = {
            quantity: 1,
            title: 'Type 1 code 1',
            thumbnail_image: 'image',
            price: '$3.49',
            productCode: '1',
            deliveryType: '1'
        };
        expect(reducer(initialState, addToCart(product))).toMatchSnapshot();
    });
    it('handles addToCart then removeFromCart', () => {
        const product = {
            quantity: 1,
            title: 'Type 1 code 1',
            thumbnail_image: 'image',
            price: '$3.49',
            productCode: '1',
            deliveryType: '1'
        };
        const newState = reducer(initialState, addToCart(product));
        expect(reducer(newState, removeFromCart(product))).toMatchSnapshot();
    });
    it('handles setCurrentLocation', () => {
        expect(
            reducer(initialState, setCurrentLocation('address', { latitude: 0, longitude: 1 }))
        ).toMatchSnapshot();
    });
});

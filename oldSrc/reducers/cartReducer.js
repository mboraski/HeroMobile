import _ from 'lodash';
import {
    // ADD_TO_CART,
    // REMOVE_FROM_CART,
    UPDATE_CART
} from '../actions/cartActions';

export const initialState = {
    products: {
        instant: {}
    },
    itemCountUp: false,
    itemCountDown: false
};

// const addProductToCart = (product, instantCartProducts) => {
//     const instantCart = Object.assign({}, instantCartProducts);
//     const cartItem = instantCart[product.productName] || {};
//     cartItem.quantityTaken += 1;
//     return instantCart;
// };
//
// const removeProductFromCart = (product, instantCartProducts) => {
//     const instantCart = Object.assign({}, instantCartProducts);
//     const cartItem = instantCart[product.productName] || {};
//     cartItem.quantityTaken -= 1;
//     return instantCart;
// };

const mutateProductsIntoCart = newProducts => {
    const newInstantCart = {};
    _.forEach(newProducts.instant, product => {
        if (product) {
            newInstantCart[product.productName] = {
                categories: product.categories,
                imageUrl: product.imageUrl,
                price: product.price,
                productName: product.productName,
                quantityAvailable: product.quantity,
                quantityTaken: 0
            };
        }
    });
    return { instant: newInstantCart };
};

const mergeCarts = (newCart, oldCart) => {
    const netCart = { instant: {} };
    let itemCountUp = false;
    let itemCountDown = false;
    _.forEach(newCart.instant, item => {
        const oldItem = oldCart.instant[item.productName];
        if (oldItem) {
            const upOrDown = oldItem.quantityAvailable - item.quantityAvailable;
            let newQuantityTaken = 0;
            if (item.quantityAvailable < oldItem.quantityTaken) {
                newQuantityTaken = item.quantityAvailable;
            } else {
                newQuantityTaken = oldItem.quantityTaken;
            }
            if (upOrDown < 0) {
                itemCountUp = true;
            } else {
                itemCountDown = true;
                netCart.instant[oldItem.productName] = {
                    categories: oldItem.categories,
                    imageUrl: oldItem.imageUrl,
                    price: oldItem.price,
                    productName: oldItem.productName,
                    quantityAvailable: item.quantityAvailable,
                    quantityTaken: newQuantityTaken
                };
            }
        } else {
            itemCountUp = true;
            netCart.instant[item.productName] = item;
        }
    });
    return { netCart, itemCountUp, itemCountDown };
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CART: {
            const translate = mutateProductsIntoCart(action.payload);
            const merge = mergeCarts(translate, state.products);
            console.log('translate: ', translate);
            console.log('merge: ', merge);
            return {
                ...state,
                products: merge.netCart,
                itemCountUp: merge.itemCountUp,
                itemCountDown: merge.itemCountDown
            };
        }
        default:
            return state;
    }
};

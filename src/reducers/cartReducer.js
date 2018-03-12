import _ from 'lodash';
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SET_CURRENT_LOCATION,
    UPDATE_CART
} from '../actions/cartActions';

// function normalizeCurrency(currency) {
//     if (typeof currency === 'string') return Number(currency.replace(/[^0-9\.-]+/g, ''));
//     return currency;
// }

export const initialState = {
    products: {
        instant: {}
    },
    itemCountUp: false,
    itemCountDown: false,
    serviceFee: 0,
    deliveryFee: 0,
    serviceRate: 0.1,
    localSalesTaxRate: 0.0625,
    currentSetAddress: '310 E 5th St, Austin, TX 78701',
    region: {
        latitude: 30.2666247,
        longitude: -97.7405174,
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034
    }
};

const addProductToCart = (product, instantCartProducts) => {
    const instantCart = Object.assign({}, instantCartProducts);
    const cartItem = instantCart[product.productName] || {};
    cartItem.quantityTaken += 1;
    return instantCart;
};

const removeProductFromCart = (product, instantCartProducts) => {
    const instantCart = Object.assign({}, instantCartProducts);
    const cartItem = instantCart[product.productName] || {};
    cartItem.quantityTaken -= 1;
    return instantCart;
};

const mutateProductsIntoCart = (newProducts) => {
    // for each product, set a new object in the cart object at key of productName
    const newInstantCart = {};
    _.forEach(newProducts.instant, (product) => {
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
    // for each product, set a new object in the cart object at key of productName
    // const newFastCart = {};
    // _.forEach(newProducts.fast, (product) => {
    //     newFastCart[product.productName] = {
    //         categories: product.categories,
    //         imageUrl: product.imageUrl,
    //         price: product.price,
    //         productName: product.productName,
    //         quantityAvailable: product.quantity,
    //         quantityTaken: 0
    //     }
    // })
};

const mergeCarts = (newCart, oldCart) => {
    const netCart = { instant: {} };
    let itemCountUp = false;
    let itemCountDown = false;
    _.forEach(newCart.instant, (item) => {
        const oldItem = oldCart.instant[item.productName];
        if (oldItem) {
            // did the quantity available go down
            // did the quantity available go up
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

// const removeProductFromCart = (product, key, cartProducts) => {
//     let cartItem = cartProducts[key] || null;
//     if (!cartItem) {
//         cartItem = product;
//     } else {
//         cartItem.quantity = --cartItem.quantity;
//     }
//     return cartItem;
// };

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const product = action.payload;
            const newCart = addProductToCart(product, state.products.instant);
            return {
                ...state,
                products: {
                    instant: newCart
                }
            };
        }
        case REMOVE_FROM_CART: {
            const product = action.payload;
            const newCart = removeProductFromCart(product, state.products.instant);
            return {
                ...state,
                products: {
                    instant: newCart
                }
            };
        }
        case SET_CURRENT_LOCATION:
            return {
                ...state,
                currentSetAddress: action.payload.address,
                region: action.payload.region
            };
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

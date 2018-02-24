import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SET_CURRENT_LOCATION
} from '../actions/cartActions';

function normalizeCurrency(currency) {
    if (typeof currency === 'string') return Number(currency.replace(/[^0-9\.-]+/g, ''));
    return currency;
}

export const initialState = {
    orderId: '',
    totalQuantity: 0,
    totalCost: 0,
    currentSetAddress: '',
    currentSetLatLon: { lat: null, lon: null },
    products: {}
};

function addToType(state = {}, product) {
    return {
        ...state,
        [product.deliveryType]: addToCode(state[product.deliveryType], product)
    };
}

function addToCode(state = {}, product) {
    return {
        ...state,
        [product.productCode]: addToOrder(state[product.productCode], product)
    };
}

function addToOrder(state = { quantity: 0 }, product) {
    return {
        ...product,
        ...state,
        price: !state.price ? normalizeCurrency(product.price) : state.price,
        quantity: state.quantity + 1
    };
}

function removeFromType(state, product) {
    return {
        ...state,
        [product.deliveryType]: removeFromCode(state[product.deliveryType], product)
    };
}

function removeFromCode(state, product) {
    return {
        ...state,
        [product.productCode]: removeFromOrder(state[product.productCode])
    };
}

function removeFromOrder(state) {
    if (state.quantity === 0) {
        return state;
    }
    return {
        ...state,
        quantity: state.quantity - 1
    };
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                products: addToType(state.products, action.payload),
                totalQuantity: state.totalQuantity + 1,
                totalCost: Math.max(
                    0,
                    (state.totalCost + normalizeCurrency(action.payload.price)).toFixed(2)
                )
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                products: removeFromType(state.products, action.payload),
                totalQuantity: Math.max(0, state.totalQuantity - 1),
                totalCost: Math.max(
                    0,
                    (state.totalCost - normalizeCurrency(action.payload.price)).toFixed(2)
                )
            };
        case SET_CURRENT_LOCATION:
            return {
                ...state,
                currentSetAddress: action.payload.address,
                currentSetLatLon: {
                    lat: action.payload.region.latitude,
                    lon: action.payload.region.longitude
                }
            };
        default:
            return state;
    }
};

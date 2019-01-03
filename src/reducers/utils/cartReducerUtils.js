import forEach from 'lodash.foreach';
import reduce from 'lodash.reduce';

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

const mutateProductsIntoCart = newProducts => {
    // for each product, set a new object in the cart object at key of productName
    const newInstantCart = {};
    forEach(newProducts.instant, product => {
        if (product) {
            const totalQuantity = reduce(
                product.contractors,
                (sum, contractor) => sum + contractor.quantity,
                0
            );
            newInstantCart[product.productName] = {
                categories: product.categories,
                imageUrl: product.imageUrl,
                price: product.price,
                productName: product.productName,
                quantityAvailable: totalQuantity,
                quantityTaken: 0,
                contractors: product.contractors
            };
        }
    });
    return { instant: newInstantCart };
};

const mergeCarts = (newCart, oldCart) => {
    const netCart = { instant: {} };
    let itemCountUp = false;
    let itemCountDown = false;
    forEach(newCart.instant, item => {
        const oldItem = oldCart.instant[item.productName];
        if (oldItem) {
            // did the quantity available go up or down
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
                    quantityTaken: newQuantityTaken,
                    contractors: item.contractors
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

export {
    addProductToCart,
    removeProductFromCart,
    mutateProductsIntoCart,
    mergeCarts
};

import forEach from 'lodash.foreach';

const addProductToCart = (product, instantCartProducts) => {
    const instantCart = Object.assign({}, instantCartProducts);
    const cartItem = instantCart[product.id] || {};
    cartItem.quantityTaken += 1;
    return instantCart;
};

const removeProductFromCart = (product, instantCartProducts) => {
    const instantCart = Object.assign({}, instantCartProducts);
    const cartItem = instantCart[product.id] || {};
    cartItem.quantityTaken -= 1;
    return instantCart;
};

const mergeCarts = (newCart, oldCart) => {
    const netCart = { instant: {} };
    let itemCountUp = false;
    let itemCountDown = false;
    forEach(newCart.instant, item => {
        const oldItem = oldCart.instant[item.id];
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
                netCart.instant[item.id] = {
                    id: item.id,
                    category: item.category,
                    subCategories: item.subcategories,
                    price: item.price,
                    productName: item.productName,
                    size: item.size,
                    brand: item.brand,
                    contractors: item.contractors,
                    quantityAvailable: item.quantityAvailable,
                    quantityTaken: newQuantityTaken
                };
            }
        } else {
            itemCountUp = true;
            netCart.instant[item.id] = item;
        }
    });
    return { netCart, itemCountUp, itemCountDown };
};

export { addProductToCart, removeProductFromCart, mergeCarts };

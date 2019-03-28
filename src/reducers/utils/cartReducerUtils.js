import reduce from 'lodash.reduce';

const addProductToCart = (product, instantCartProducts) => {
    const instantCart = Object.assign({}, instantCartProducts);
    const cartItem = instantCart[product.id] || {};
    cartItem.quantityTaken += 1;
    return instantCart;
};

const removeProductFromCart = (product, instantCartProducts) => {
    const instantCart = Object.assign({}, instantCartProducts);
    const cartItem = instantCart[product.id] || {};
    if (cartItem.quantityTaken > 0) {
        cartItem.quantityTaken -= 1;
    }
    return instantCart;
};

// TODO: this needs refactor
const mergeCarts = (newCart, oldCart) => {
    let itemCountUp = false;
    let itemCountDown = false;
    const netCart = reduce(
        newCart.instant,
        (cart, item) => {
            const oldItem = cart.instant[item.id];
            if (oldItem) {
                // did the quantity available go up or down
                const upOrDown =
                    oldItem.quantityAvailable - item.quantityAvailable;
                let newQuantityTaken = 0;
                if (item.quantityTaken > oldItem.quantityTaken) {
                    newQuantityTaken = item.quantityTaken;
                } else {
                    newQuantityTaken = oldItem.quantityTaken;
                }
                if (upOrDown < 0) {
                    itemCountUp = true;
                } else {
                    itemCountDown = true;
                    cart.instant[item.id] = {
                        id: item.id,
                        category: item.category,
                        subCategories: item.subcategories || {},
                        price: item.price,
                        productName: item.productName,
                        size: item.size || '',
                        brand: item.brand || '',
                        contractors: item.contractors || {},
                        quantityAvailable: item.quantityAvailable,
                        quantityTaken: newQuantityTaken
                    };
                }
            } else {
                itemCountUp = true;
                cart.instant[item.id] = item;
            }
            return cart;
        },
        oldCart
    );
    return { netCart, itemCountUp, itemCountDown };
};

export { addProductToCart, removeProductFromCart, mergeCarts };

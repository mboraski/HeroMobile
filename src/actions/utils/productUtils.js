import reduce from 'lodash.reduce';

const mutateProductsIntoCart = products => {
    const newInstantCart = reduce(
        products,
        (accum, product, id) => {
            const cartProduct = {
                id,
                category: product.category,
                subCategories: product.subcategories,
                price: product.price,
                productName: product.productName,
                size: product.size,
                brand: product.brand,
                contractors: {},
                quantityAvailable: 0,
                quantityTaken: 0
            };
            return Object.assign({}, accum, { [id]: cartProduct });
        },
        {}
    );
    return { instant: newInstantCart };
};

export { mutateProductsIntoCart };

// Old
// const mutateProductsIntoCart = newProducts => {
//     const newInstantCart = {};
//     forEach(newProducts.instant, product => {
//         if (product) {
//             const totalQuantity = reduce(
//                 product.contractors,
//                 (sum, contractor) => sum + contractor.quantity,
//                 0
//             );
//             newInstantCart[product.productName] = {
//                 categories: product.categories,
//                 imageUrl: product.imageUrl,
//                 price: product.price,
//                 productName: product.productName,
//                 quantityAvailable: totalQuantity,
//                 quantityTaken: 0,
//                 contractors: product.contractors
//             };
//         }
//     });
//     return { instant: newInstantCart };
// };

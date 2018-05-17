// TODO: Remove when tests implemented
test.only('real recognize real', () => {
    expect('real').toBe('real');
});
// import {
//     getCartProducts,
//     getDeliveryTypes,
//     getCartOrders,
//     getCartTotalQuantity,
//     getCartTotalCost,
//     getAvailableCartOrders
// } from '../cartSelectors';
//
// const cart = {
//     products: {
//         1: {
//             1: {
//                 deliveryType: '1',
//                 price: 0.99,
//                 productCode: '1',
//                 quantity: 1,
//                 thumbnail_image: 'thumbnail_image',
//                 title: 'type 1 code 1'
//             },
//             2: {
//                 deliveryType: '1',
//                 price: 0.99,
//                 productCode: '2',
//                 quantity: 1,
//                 thumbnail_image: 'thumbnail_image',
//                 title: 'type 1 code 2'
//             },
//             3: {
//                 deliveryType: '1',
//                 price: 0.99,
//                 productCode: '3',
//                 quantity: 0,
//                 thumbnail_image: 'thumbnail_image',
//                 title: 'type 1 code 3'
//             }
//         },
//         2: {
//             1: {
//                 deliveryType: '2',
//                 price: 0.99,
//                 productCode: '1',
//                 quantity: 1,
//                 thumbnail_image: 'thumbnail_image',
//                 title: 'type 2 code 1'
//             },
//             2: {
//                 deliveryType: '2',
//                 price: 0.99,
//                 productCode: '2',
//                 quantity: 1,
//                 thumbnail_image: 'thumbnail_image',
//                 title: 'type 2 code 2'
//             },
//             3: {
//                 deliveryType: '2',
//                 price: 0.99,
//                 productCode: '3',
//                 quantity: 0,
//                 thumbnail_image: 'thumbnail_image',
//                 title: 'type 2 code 3'
//             }
//         }
//     }
// };
//
// describe('cartSelector', () => {
//     it('getCartProducts', () => {
//         const state = {
//             cart
//         };
//         expect(getCartProducts(state)).toEqual(state.cart.products);
//     });
//     it('getDeliveryTypes', () => {
//         const state = {
//             cart
//         };
//         expect(getDeliveryTypes(state)).toMatchSnapshot();
//     });
//     it('getCartOrders', () => {
//         const state = {
//             cart
//         };
//         expect(getCartOrders(state)).toMatchSnapshot();
//     });
//     it('getCartTotalQuantity', () => {
//         const state = {
//             cart
//         };
//         expect(getCartTotalQuantity(state)).toMatchSnapshot();
//     });
//     it('getCartTotalCost', () => {
//         const state = {
//             cart
//         };
//         expect(getCartTotalCost(state)).toMatchSnapshot();
//     });
//     it('getAvailableCartOrders', () => {
//         const state = {
//             cart,
//             product: {
//                 availableProducts: {
//                     1: {
//                         1: {
//                             quantity: 1,
//                             title: 'Type 1 code 1',
//                             thumbnail_image: 'image',
//                             price: '$3.49'
//                         },
//                         2: {
//                             quantity: 0,
//                             title: 'Type 1 code 2',
//                             thumbnail_image: 'image',
//                             price: 0.99
//                         }
//                     },
//                     2: {
//                         1: {
//                             quantity: 1,
//                             title: 'Type 2 code 1',
//                             thumbnail_image: 'image',
//                             price: 0.99
//                         },
//                         2: {
//                             quantity: 0,
//                             title: 'Type 2 code 2',
//                             thumbnail_image: 'image',
//                             price: 0.99
//                         }
//                     },
//                     3: {
//                         1: {
//                             quantity: 1,
//                             title: 'Type 3 code 1',
//                             thumbnail_image: 'image',
//                             price: 0.99
//                         }
//                     }
//                 }
//             }
//         };
//         expect(getAvailableCartOrders(state)).toMatchSnapshot();
//     });
// });

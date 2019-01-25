import filter from 'lodash.filter';
import forEach from 'lodash.foreach';
import reduce from 'lodash.reduce';

import { noHeroesAvailable } from './mapActions';
import { updateCart } from './cartActions';
import { mergeInventories } from './contractorActions';
import { rtdb, db, fire } from '../../firebase';

export const SELECT_CATEGORY = 'select_category';
export const FETCH_PRODUCTS_REQUEST = 'fetch_products_request';
export const FETCH_PRODUCTS_SUCCESS = 'fetch_products_success';
export const FETCH_PRODUCTS_ERROR = 'fetch_products_error';
export const FETCH_CUSTOMER_BLOCK_REQUEST = 'fetch_customer_block_request';
export const FETCH_CUSTOMER_BLOCK_SUCCESS = 'fetch_customer_block_success';
export const FETCH_CUSTOMER_BLOCK_ERROR = 'fetch_customer_block_error';
export const SET_IMAGE = 'set_image';

const CUSTOMER_BLOCK_REF = 'activeProducts/US/TX/Austin';

export const fetchProducts = () => async dispatch => {
    try {
        dispatch({ type: FETCH_PRODUCTS_REQUEST });

        const querySnapshot = await db.collection('products').get();
        const productList = {};
        querySnapshot.forEach(doc => {
            productList[doc.id] = doc.data();
        });
        dispatch(setProductsSuccess(productList));
        dispatch(mergeInventories(productList));
    } catch (err) {
        console.log('err: ', err);
        dispatch(setProductsError(err));
    }
};

// TODO: rename
export const setProductsSuccess = products => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products
});

export const setProductsError = error => ({
    type: FETCH_PRODUCTS_ERROR,
    payload: error
});

export const fetchCustomerBlock = () => dispatch => {
    dispatch({ type: FETCH_CUSTOMER_BLOCK_REQUEST });
    return listenCustomerBlockRef(dispatch);
};

export const listenCustomerBlockRef = dispatch =>
    rtdb.ref(CUSTOMER_BLOCK_REF).on(
        'value',
        snapshot => {
            const data = snapshot.val();
            const products = data.products;
            // for some reason firebase has empty hashed database objects, this filters them
            // TODO: figure out why firebase did this
            const filteredProducts = {};
            filteredProducts.instant = filter(
                products.instant,
                product => !!product
            );
            if (Object.keys(filteredProducts.instant).length < 1) {
                dispatch(
                    noHeroesAvailable({
                        code: '007',
                        message: 'No Heroes Available'
                    })
                );
            } else {
                dispatch(fetchProductsSuccess(filteredProducts));
                dispatch(fetchProductImages(filteredProducts, dispatch));
                dispatch(updateCart(filteredProducts));
            }
        },
        error => dispatch(fetchProductsFailure(error))
    );

export const unListenCustomerBlock = () => rtdb.ref(CUSTOMER_BLOCK_REF).off();

export const fetchProductsSuccess = products => ({
    type: FETCH_CUSTOMER_BLOCK_SUCCESS,
    payload: products
});

export const fetchProductsFailure = error => ({
    type: FETCH_CUSTOMER_BLOCK_ERROR,
    payload: error
});

export const selectCategory = category => ({
    type: SELECT_CATEGORY,
    payload: category
});

export const fetchProductImages = (products, dispatch) => async () => {
    const storageRef = fire.storage();
    // this.productImage = 'gs://hasty-14d18.appspot.com/productImages/advil-packet.jpg'
    // console.log('products: ', products);
    forEach(products.instant, product => {
        const imageUrl = product.imageUrl || '';
        if (imageUrl) {
            const imageRef = storageRef.refFromURL(imageUrl);
            imageRef
                .getDownloadURL()
                .then(url => {
                    dispatch({
                        type: SET_IMAGE,
                        payload: { productName: product.productName, url }
                    });
                })
                .catch(() => {
                    // TODO: use placeholder image if error, not empty string
                    dispatch({
                        type: SET_IMAGE,
                        payload: { productName: product.productName, url: '' }
                    });
                });
        } else {
            dispatch({
                type: SET_IMAGE,
                payload: { productName: product.productName, url: '' }
            });
        }
    });
};

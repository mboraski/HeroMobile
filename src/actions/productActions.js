// Third Party Imports
import filter from 'lodash.filter';
import forEach from 'lodash.foreach';
import firebase from 'firebase';

// Relative Imports
import { updateCart } from './cartActions';

// Action Types
export const SELECT_CATEGORY = 'select_category';
export const INVENTORY_REQUEST = 'inventory_request';
export const INVENTORY_SUCCESS = 'inventory_success';
export const INVENTORY_FAILURE = 'inventory_failure';
export const FETCH_PRODUCTS_REQUEST = 'fetch_products_request';
export const FETCH_PRODUCTS_SUCCESS = 'fetch_products_success';
export const FETCH_PRODUCTS_FAILURE = 'fetch_products_failure';
export const SET_IMAGE = 'set_image';

// DB Refs
const PRODUCTS_URL = 'products';
const productsRef = firebase.database().ref(PRODUCTS_URL);

// Helper Functions
const onProductFetchSuccess = (snapshot, dispatch) => {
    const products = snapshot.val();
    // for some reason firebase has empty hashed database objects, this filters them
    // TODO: figure out why firebase did this
    if (products) {
        const filteredProducts = {};
        filteredProducts.instant = filter(
            products.instant,
            product => !!product
        );
        dispatch(fetchProductsSuccess(filteredProducts));
        dispatch(fetchProductImages(filteredProducts, dispatch));
        dispatch(updateCart(filteredProducts));
    }
};

// Actions
export const addProductListener = callback => productsRef.on('value', callback);

export const removeProductListener = () => productsRef.off();

export const fetchProductsRequest = () => dispatch => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    addProductListener(onProductFetchSuccess);
};

export const fetchProductsSuccess = products => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products
});

export const fetchProductsFailure = error => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: error
});

export const selectCategory = category => ({
    type: SELECT_CATEGORY,
    payload: category
});

export const fetchProductImages = (products, dispatch) => async () => {
    const storageRef = firebase.storage();
    // this.productImage = 'gs://hasty-14d18.appspot.com/productImages/advil-packet.jpg'
    console.log('products: ', products);
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
                .catch(error => {
                    console.log('getDownloadUrl error: ', error);
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

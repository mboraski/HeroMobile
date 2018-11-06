import axios from 'axios';
import { functions } from '../../firebase';

export const instance = axios.create({
    baseURL: 'https://us-central1-hasty-14d18.cloudfunctions.net/'
});
// For testing:
// const instance = axios.create({
//     baseURL: 'http://localhost:5000/hasty-14d18/us-central1/'
// });

export function completeOrder(args) {
    const co = functions.httpsCallable('completeOrder');
    return co(args);
}

export function createStripeCustomerWithCard(args) {
    const csawc = functions.httpsCallable('createStripeCustomerWithCard');
    return csawc(args);
}

export function addStripeCustomerSource(args) {
    const ascs = functions.httpsCallable('addStripeCustomerSource');
    return ascs(args);
}

export function removeStripeCustomerSource(args) {
    const rscs = functions.httpsCallable('removeStripeCustomerSource');
    return rscs(args);
}

export function chargeStripeCustomerSource(args) {
    const cscs = functions.httpsCallable('chargeStripeCustomerSource');
    return cscs(args);
}

export function consumerCallsContractor(args) {
    const ccc = functions.httpsCallable('consumerCallsContractor');
    return ccc(args);
}

export function logCustomerError(args) {
    return instance.post('logCustomerError', args);
}

function handleRequestConfig(config) {
    if (__DEV__) {
        // console.log(config);
    }
    return config;
}

function handleRequestError(error) {
    if (__DEV__) {
        // console.log(error);
    }
    return Promise.reject(error);
}

function handleResponseSuccess(config) {
    if (__DEV__) {
        // console.log(config);
    }
    return config;
}

function handleResponseError(error) {
    if (__DEV__) {
        // console.log(error);
    }
    return Promise.reject(error);
}

export const requestInterceptorId = instance.interceptors.request.use(
    handleRequestConfig,
    handleRequestError
);
export const responseInterceptorId = instance.interceptors.response.use(
    handleResponseSuccess,
    handleResponseError
);

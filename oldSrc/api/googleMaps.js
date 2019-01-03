import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/'
});

export default {
    placesAutoComplete(...args) {
        return instance.get('place/autocomplete/json', ...args);
    },
    geocode(...args) {
        return instance.get('geocode/json', ...args);
    }
};

function handleRequestConfig(config) {
    if (__DEV__) {
        console.log(config);
    }
    return config;
}

function handleRequestError(error) {
    if (__DEV__) {
        console.log(error);
    }
    return Promise.reject(error);
}

function handleResponseSuccess(config) {
    if (__DEV__) {
        console.log(config);
    }
    return config;
}

function handleResponseError(error) {
    if (__DEV__) {
        console.log(error);
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

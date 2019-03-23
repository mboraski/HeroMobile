import { REHYDRATE } from 'redux-persist/lib/constants';
import { Dimensions } from 'react-native';

import {
    MAPS_PLACES_AUTOCOMPLETE_REQUEST,
    MAPS_PLACES_AUTOCOMPLETE_SUCCESS,
    MAPS_PLACES_AUTOCOMPLETE_FAIL,
    MAPS_GEOCODE_REQUEST,
    MAPS_GEOCODE_SUCCESS,
    MAPS_GEOCODE_FAIL,
    MAPS_REVERSE_GEOCODE_REQUEST,
    MAPS_REVERSE_GEOCODE_SUCCESS,
    MAPS_REVERSE_GEOCODE_FAIL
} from '../actions/googleMapsActions';
import {
    SAVE_ADDRESS,
    SET_REGION,
    GET_CURRENT_LOCATION_REQUEST,
    GET_CURRENT_LOCATION_SUCCESS,
    GET_CURRENT_LOCATION_ERROR,
    NULLIFY_MAP_ERROR,
    NO_HEROES_AVAILABLE,
    DETERMINE_DELIVERY_DISTANCE_REQUEST,
    DETERMINE_DELIVERY_DISTANCE_SUCCESS,
    DETERMINE_DELIVERY_DISTANCE_ERROR,
    LOCATION_FEEDBACK_POPUP_CLOSE
} from '../actions/mapActions';
import { SIGNOUT_SUCCESS } from '../actions/authActions';

import { getFormattedAddress, getLocation } from './utils/mapReducerUtils';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 30.2666247;
const LONGITUDE = -97.7405174;
const LATITUDE_DELTA = 0.0043;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const initialRegion = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA || 0.0043
};

const initialState = {
    pending: false,
    predictions: [],
    saved: [],
    region: initialRegion, // This is the user set delivery location
    coords: null, // This is the user's location
    timestamp: null,
    address: '', // This is the readable address of the delivery location
    error: null,
    delivery: {
        distance: {
            text: '',
            value: 0
        },
        duration: {
            text: '',
            value: 0
        },
        status: ''
    },
    locationFeedbackPopupVisible: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SIGNOUT_SUCCESS:
            return initialState;
        case REHYDRATE:
            if (action.payload && action.payload.map) {
                return {
                    ...state,
                    ...action.payload.map,
                    predictions: []
                };
            }
            return state;
        case DETERMINE_DELIVERY_DISTANCE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case DETERMINE_DELIVERY_DISTANCE_SUCCESS:
            return {
                ...state,
                pending: false,
                delivery: action.payload
            };
        case DETERMINE_DELIVERY_DISTANCE_ERROR:
            return {
                ...state,
                pending: false
            };
        case MAPS_PLACES_AUTOCOMPLETE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case MAPS_PLACES_AUTOCOMPLETE_SUCCESS:
            return {
                ...state,
                pending: false,
                predictions: action.payload.predictions || [],
                error: null
            };
        case MAPS_PLACES_AUTOCOMPLETE_FAIL:
            return {
                ...state,
                pending: false,
                predictions: [],
                error: action.error
            };
        case MAPS_GEOCODE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case MAPS_GEOCODE_SUCCESS:
            return {
                ...state,
                pending: false,
                region: {
                    ...state.region,
                    ...getLocation(action.payload)
                }
            };
        case MAPS_GEOCODE_FAIL:
            return {
                ...state,
                pending: false,
                error: action.error
            };
        case MAPS_REVERSE_GEOCODE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case MAPS_REVERSE_GEOCODE_SUCCESS:
            return {
                ...state,
                pending: false,
                address: getFormattedAddress(action.payload)
            };
        case MAPS_REVERSE_GEOCODE_FAIL:
            return {
                ...state,
                pending: false,
                address: '',
                error: action.error
            };
        case SAVE_ADDRESS:
            return {
                ...state,
                saved: !state.saved.includes(action.payload)
                    ? [...state.saved, action.payload]
                    : state.saved,
                address: action.payload
            };
        case SET_REGION:
            return {
                ...state,
                region: action.payload
            };
        case GET_CURRENT_LOCATION_REQUEST:
            return {
                ...state,
                pending: true
            };
        case GET_CURRENT_LOCATION_SUCCESS:
            return {
                ...state,
                pending: false,
                coords: action.payload.coords,
                timestamp: action.payload.timestamp
            };
        case GET_CURRENT_LOCATION_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            };
        case NO_HEROES_AVAILABLE:
            return {
                ...state,
                pending: false,
                error: {
                    code: '007',
                    message: 'No Heroes Available'
                },
                locationFeedbackPopupVisible: true
            };
        case NULLIFY_MAP_ERROR:
            return {
                ...state,
                error: null
            };
        case LOCATION_FEEDBACK_POPUP_CLOSE:
            return {
                ...state,
                error: null,
                locationFeedbackPopupVisible: false
            };
        default:
            return state;
    }
}

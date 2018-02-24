import {
    SAVE_ADDRESS,
    SET_REGION,
    GET_CURRENT_LOCATION_REQUEST,
    GET_CURRENT_LOCATION_SUCCESS,
    GET_CURRENT_LOCATION_ERROR
} from '../../actions/mapActions';
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
} from '../../actions/googleMapsActions';
import reducer, { initialState } from '../mapReducer';

describe('mapReducer', () => {
    it('handles SAVE_ADDRESS action', () => {
        const newState = reducer(initialState, {
            type: SAVE_ADDRESS,
            payload: 'address'
        });
        expect(newState).toMatchSnapshot();
        expect(
            reducer(newState, {
                type: SAVE_ADDRESS,
                payload: 'address'
            })
        ).toMatchSnapshot();
    });
    it('handles SET_REGION action', () => {
        const newState = reducer(initialState, {
            type: SET_REGION,
            payload: { latitude: 0, longitude: 1, latitudeDelta: 2, longitudeDelta: 3 }
        });
        expect(newState).toMatchSnapshot();
        expect(
            reducer(newState, {
                type: SET_REGION,
                payload: { latitude: 5, longitude: 6 }
            })
        ).toMatchSnapshot();
    });
    it('handles GET_CURRENT_LOCATION_REQUEST action', () => {
        expect(reducer(initialState, { type: GET_CURRENT_LOCATION_REQUEST })).toMatchSnapshot();
    });
    it('handles GET_CURRENT_LOCATION_SUCCESS action', () => {
        expect(reducer(initialState, { type: GET_CURRENT_LOCATION_SUCCESS })).toMatchSnapshot();
    });
    it('handles GET_CURRENT_LOCATION_ERROR action', () => {
        expect(
            reducer(initialState, { type: GET_CURRENT_LOCATION_ERROR, error: 'error' })
        ).toMatchSnapshot();
    });
    it('handles MAPS_PLACES_AUTOCOMPLETE_REQUEST action', () => {
        expect(reducer(initialState, { type: MAPS_PLACES_AUTOCOMPLETE_REQUEST })).toMatchSnapshot();
    });
    it('handles MAPS_PLACES_AUTOCOMPLETE_SUCCESS action', () => {
        const payload = { predictions: 'predictions' };
        expect(
            reducer(initialState, {
                type: MAPS_PLACES_AUTOCOMPLETE_SUCCESS,
                payload
            })
        ).toMatchSnapshot();
    });
    it('handles MAPS_PLACES_AUTOCOMPLETE_FAIL action', () => {
        expect(reducer(initialState, { type: MAPS_PLACES_AUTOCOMPLETE_FAIL })).toMatchSnapshot();
    });
    it('handles MAPS_GEOCODE_REQUEST action', () => {
        expect(reducer(initialState, { type: MAPS_GEOCODE_REQUEST })).toMatchSnapshot();
    });
    it('handles MAPS_GEOCODE_SUCCESS action', () => {
        const payload = {
            results: [
                {
                    geometry: {
                        location: {
                            lat: 0,
                            lng: 1
                        }
                    }
                }
            ]
        };
        expect(reducer(initialState, { type: MAPS_GEOCODE_SUCCESS, payload })).toMatchSnapshot();
    });
    it('handles MAPS_GEOCODE_FAIL action', () => {
        expect(reducer(initialState, { type: MAPS_GEOCODE_FAIL, error: 'error' })).toMatchSnapshot();
    });
    it('handles MAPS_REVERSE_GEOCODE_REQUEST action', () => {
        expect(reducer(initialState, { type: MAPS_REVERSE_GEOCODE_REQUEST })).toMatchSnapshot();
    });
    it('handles MAPS_REVERSE_GEOCODE_SUCCESS action', () => {
        const payload = { results: [{ formatted_address: 'formatted_address' }] };
        expect(
            reducer(initialState, { type: MAPS_REVERSE_GEOCODE_SUCCESS, payload })
        ).toMatchSnapshot();
    });
    it('handles MAPS_REVERSE_GEOCODE_FAIL action', () => {
        expect(reducer(initialState, { type: MAPS_REVERSE_GEOCODE_FAIL, error: 'error' })).toMatchSnapshot();
    });
});

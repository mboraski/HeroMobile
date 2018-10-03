import { rtdb, firebaseAuth } from '../../firebase';
import orderStatuses from '../constants/Order';

import { distanceMatrix } from './googleMapsActions';
import { getCurrentLocation } from './mapActions';
import { dropdownAlert } from './uiActions';

export const FISH_ORDERS_REQUEST = 'fish_orders_request';
export const FISH_ORDERS_SUCCESS = 'fish_orders_success';
export const FISH_ORDERS_FAILURE = 'fish_orders_failure';
export const ACCEPT_ORDER_REQUEST = 'accept_order_request';
export const ACCEPT_ORDER_SUCCESS = 'accept_order_success';
export const ACCEPT_ORDER_FAILURE = 'accept_order_failure';
export const ARRIVE_ORDER_REQUEST = 'accept_order_request';
export const ARRIVE_ORDER_SUCCESS = 'accept_order_success';
export const ARRIVE_ORDER_FAILURE = 'accept_order_failure';
export const COMPLETE_ORDER_REQUEST = 'accept_order_request';
export const COMPLETE_ORDER_SUCCESS = 'accept_order_success';
export const COMPLETE_ORDER_FAILURE = 'accept_order_failure';

export const fishOrdersRequest = () => dispatch => {
    dispatch({ type: FISH_ORDERS_REQUEST });
    const user = firebaseAuth.currentUser;
    const uid = user ? user.uid : null;
    const activeHeroRef = rtdb.ref(
        `activeHeroes/US/TX/Austin/${uid}/potentialOrders`
    );
    activeHeroRef.on('value', snapshot => {
        const potentialOrders = snapshot.val();
        dispatch({
            type: FISH_ORDERS_SUCCESS,
            payload: potentialOrders
        });
    });
};

export const acceptRequest = (
    order,
    productsSatisfied,
    hero,
    region
) => async dispatch => {
    console.log('orderId: ', order.orderId);
    console.log('productsSatisfied: ', productsSatisfied);
    console.log('hero: ', hero);
    console.log('region: ', region);
    dispatch({ type: ACCEPT_ORDER_REQUEST });
    const currentLocation = await getCurrentLocation();
    if (!currentLocation) {
        dropdownAlert(true, 'Could not get current location');
    } else {
        // determine delivery distance
        const origins = `${currentLocation.latitude}, ${
            currentLocation.longitude
        }`;
        const destinations = `${region.latitude},${region.longitude}`;
        const result = await distanceMatrix({
            units: 'imperial',
            origins,
            destinations
        });
        if (result.rows[0].elements[0].duration.value > 60 * 30) {
            dropdownAlert(true, 'You are too far away');
            dispatch({
                type: ACCEPT_ORDER_FAILURE,
                payload: 'You are too far away'
            });
        } else {
            dropdownAlert(false, '');
            // create link to google maps
            hero.deliveryTime = result.rows[0].elements[0].duration.value / 60;
            const orderRef = rtdb.ref(`orders/US/TX/Austin/${order.orderId}`);
            orderRef
                .set({
                    productsSatisfied,
                    hero,
                    status: orderStatuses.accepted
                })
                .then(() => {
                    const successPayload = {
                        link: `https://www.google.com/maps/dir/?api=1&origin=${origins}&destinations=${destinations}&travelmode=walking`
                    };
                    dispatch({
                        type: ACCEPT_ORDER_SUCCESS,
                        payload: successPayload
                    });
                })
                .catch(error => {
                    dispatch({ type: ACCEPT_ORDER_FAILURE, payload: error });
                });
        }
    }
};

export const arriveRequest = orderId => dispatch => {
    dispatch({ type: ARRIVE_ORDER_REQUEST });

    const orderRef = rtdb.ref(`orders/US/TX/Austin/${orderId}`);
    orderRef
        .set({
            status: orderStatuses.arrived
        })
        .then(() => {
            dispatch({ type: ARRIVE_ORDER_SUCCESS });
        })
        .catch(error => {
            dispatch({ type: ARRIVE_ORDER_FAILURE, payload: error });
        });
};

export const completeRequest = orderId => dispatch => {
    dispatch({ type: COMPLETE_ORDER_REQUEST });

    const orderRef = rtdb.ref(`orders/US/TX/Austin/${orderId}`);
    orderRef
        .set({
            status: orderStatuses.completed
        })
        .then(() => {
            dispatch({ type: COMPLETE_ORDER_SUCCESS });
        })
        .catch(error => {
            dispatch({ type: COMPLETE_ORDER_FAILURE, payload: error });
        });
};

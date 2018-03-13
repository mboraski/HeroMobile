import firebase from '../firebase';

export const FISH_ORDERS_REQUEST = 'fish_orders_request';
export const FISH_ORDERS_SUCCESS = 'fish_orders_success';
export const FISH_ORDERS_FAILURE = 'fish_orders_failure';

export const fishOrdersRequest = () => dispatch => {
    dispatch({ type: FISH_ORDERS_REQUEST });
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const activeHeroRef = firebase.database().ref(`activeHeroes/US/TX/Austin/${uid}/potentialOrders`);
    activeHeroRef.on('value', (snapshot) => {
        const potentialOrders = snapshot.val();
        dispatch({
            type: FISH_ORDERS_SUCCESS,
            payload: potentialOrders
        });
    })
        .cath((err) => {
            dispatch({
                type: FISH_ORDERS_FAILURE,
                payload: err
            });
        });
};

import { firebaseAuth, rtdb } from '../../firebase';
import { dropdownAlert } from './uiActions';
import { logContractorError, logCurrentInventoryError } from '../api/hasty';

export const FETCH_CONTRACTOR_REQUEST = 'inventory_request';
export const FETCH_CONTRACTOR_SUCCESS = 'inventory_success';
export const FETCH_CONTRACTOR_ERROR = 'inventory_error';
export const INVENTORY_REQUEST = 'inventory_request';
export const INVENTORY_SUCCESS = 'inventory_success';
export const INVENTORY_ERROR = 'inventory_error';
export const CONFIRM_INVENTORY_REQUEST = 'confirm_inventory_request';
export const CONFIRM_INVENTORY_SUCCESS = 'confirm_inventory_success';
export const CONFIRM_INVENTORY_ERROR = 'confirm_INVENTORY_ERROR';
export const ADD_TO_INVENTORY = 'add_to_inventory';
export const REMOVE_FROM_INVENTORY = 'remove_from_inventory';
export const ONLINE = 'online';
export const OFFLINE = 'offline';

export const fetchContractor = () => dispatch => {
    dispatch({ type: FETCH_CONTRACTOR_REQUEST });
    const user = firebaseAuth.currentUser;
    const uid = user ? user.uid : null;
    const activeHeroesRef = rtdb.ref(`contractors/${uid}`);
    return activeHeroesRef
        .once('value')
        .then(snapshot => {
            const heroData = snapshot.val();
            if (heroData.online) {
                dispatch({ type: FETCH_CONTRACTOR_SUCCESS, payload: heroData });
                dispatch({ type: ONLINE });
            } else {
                dispatch({ type: FETCH_CONTRACTOR_SUCCESS, payload: heroData });
                dispatch({ type: OFFLINE });
            }
        })
        .catch(error => {
            logContractorError(uid, error);
            dispatch({ type: FETCH_CONTRACTOR_ERROR, payload: error });
            dispatch(
                dropdownAlert(true, 'Error retrieving Hero online status')
            );
        });
};

export const online = (contractorProducts, currentLocation) => dispatch => {
    const user = firebaseAuth.currentUser;
    const uid = user ? user.uid : null;
    const activeProductsRef = rtdb.ref('activeProducts/US/TX/Austin/instant');
    return activeProductsRef
        .once('value')
        .then(snapshot => {
            let result;
            const currentProducts = snapshot.val();
            if (!currentProducts) {
                // set this new productList
                result = activeProductsRef
                    .set(contractorProducts)
                    .then(() => {
                        const activeHeroesRef = rtdb.ref(
                            `activecontractors/US/TX/Austin/${uid}`
                        );
                        return activeHeroesRef
                            .set({
                                currentSetLatLon: {
                                    lat: currentLocation.lat,
                                    lon: currentLocation.lon
                                },
                                productList: contractorProducts
                            })
                            .then(() => {
                                dispatch(
                                    dropdownAlert(true, 'Successfully Online!')
                                );
                                dispatch({ type: ONLINE });
                            })
                            .catch(error => {
                                logContractorError(uid, error);
                                activeHeroesRef.remove();
                                dispatch(
                                    dropdownAlert(
                                        true,
                                        'Error setting Hero online status'
                                    )
                                );
                                dispatch({ type: OFFLINE });
                            });
                    })
                    .catch(error => {
                        logContractorError(uid, error);
                        dispatch(
                            dropdownAlert(
                                true,
                                'Error adding Hero product availability'
                            )
                        );
                        dispatch({ type: OFFLINE });
                    });
            } else {
                // loop through current products and add products this hero has
                const copyCurrentProducts = Object.assign({}, currentProducts);
                const newProducts = _.reduce(
                    contractorProducts,
                    (accum, product) => {
                        const cProduct =
                            copyCurrentProducts[product.productName] || null;
                        if (cProduct) {
                            accum[cProduct.productName] = {
                                quantity: cProduct.quantity + product.quantity,
                                productName: cProduct.productName,
                                imageUrl: cProduct.imageUrl,
                                price: cProduct.price
                            };
                        } else {
                            accum[product.productName] = product;
                        }
                        return accum;
                    },
                    copyCurrentProducts
                );
                // set this new productList
                result = activeProductsRef
                    .set(newProducts)
                    .then(() => {
                        const activeHeroesRef = rtdb.ref(
                            `activecontractors/US/TX/Austin/${uid}`
                        );
                        return activeHeroesRef
                            .set({
                                currentSetLatLon: {
                                    lat: currentLocation.lat,
                                    lon: currentLocation.lon
                                },
                                productList: contractorProducts
                            })
                            .then(() => {
                                dispatch(
                                    dropdownAlert(true, 'Successfully Online!')
                                );
                                dispatch({ type: ONLINE });
                            })
                            .catch(error => {
                                logContractorError(uid, error);
                                activeHeroesRef.remove();
                                dispatch(
                                    dropdownAlert(
                                        true,
                                        'Error setting Hero online status'
                                    )
                                );
                                dispatch({ type: OFFLINE });
                            });
                    })
                    .catch(error => {
                        logContractorError(uid, error);
                        dispatch(
                            dropdownAlert(
                                true,
                                'Error adding Hero product availability'
                            )
                        );
                        dispatch({ type: OFFLINE });
                    });
            }
            return result;
        })
        .catch(error => {
            logContractorError(uid, error);
            console.log('error connecting to online db error: ', error);
            dispatch(
                dropdownAlert(true, 'Error connecting to online database')
            );
            dispatch({ type: OFFLINE });
        });
};

export const offline = contractorProducts => dispatch => {
    const user = firebaseAuth.currentUser;
    const uid = user.uid;
    const activeHeroesRef = rtdb.ref(`activecontractors/US/TX/Austin/${uid}`);
    return activeHeroesRef
        .remove()
        .then(() => {
            const activeProductsRef = rtdb.ref(
                'activeProducts/US/TX/Austin/instant'
            );
            return activeProductsRef
                .once('value')
                .then(snapshot => {
                    const currentProducts = snapshot.val();
                    // loop through current products and add products this hero has
                    const copyCurrentProducts = Object.assign(
                        {},
                        currentProducts
                    );
                    const newProducts = _.reduce(
                        contractorProducts,
                        (accum, product) => {
                            const cProduct =
                                copyCurrentProducts[product.productName] ||
                                null;
                            if (cProduct) {
                                const quantity =
                                    cProduct.quantity - product.quantity;
                                if (quantity > 0) {
                                    accum[cProduct.productName] = {
                                        quantity,
                                        productName: cProduct.productName,
                                        imageUrl: cProduct.imageUrl,
                                        price: cProduct.price
                                    };
                                } else {
                                    accum[cProduct.productName] = null;
                                }
                            } else {
                                accum[product.productName] = product;
                            }
                            return accum;
                        },
                        copyCurrentProducts
                    );
                    return activeProductsRef
                        .set(newProducts)
                        .then(() => {
                            dispatch(
                                dropdownAlert(true, 'Successfully Offline!')
                            );
                            dispatch({ type: OFFLINE });
                        })
                        .catch(error => {
                            logContractorError(uid, error);
                            logCurrentInventoryError(uid, error, newProducts);
                            dispatch(
                                dropdownAlert(
                                    true,
                                    'Offline, but error setting available products'
                                )
                            );
                            dispatch({ type: OFFLINE });
                        });
                })
                .catch(error => {
                    logContractorError(uid, error);
                    logCurrentInventoryError(uid, error, null);
                    dispatch(
                        dropdownAlert(
                            true,
                            'Offline, but error reading product availability'
                        )
                    );
                    dispatch({ type: OFFLINE });
                });
        })
        .catch(error => {
            logContractorError(uid, error);
            dispatch(dropdownAlert(true, 'Error going offline'));
            dispatch({ type: ONLINE });
        });
};

export const fetchContractorInventory = dispatch => {
    dispatch({ type: INVENTORY_REQUEST });
    const user = firebaseAuth.currentUser;
    const uid = user ? user.uid : null;
    const inventoryRef = rtdb.ref(`contractors/${uid}/inventory`);
    inventoryRef
        .once('value')
        .then(snapshot => {
            const inventory = snapshot.val();
            if (inventory) {
                console.log('inventory: ', inventory);
                dispatch({ type: INVENTORY_SUCCESS, payload: inventory });
            } else {
                console.log('empty inventory');
                dispatch({ type: INVENTORY_SUCCESS, payload: {} });
            }
        })
        .catch(error => {
            console.log('inventory error: ', error);
            dispatch({ type: INVENTORY_ERROR, payload: error });
        });
};

export const confirmUpdateInventory = newInventory => dispatch => {
    dispatch({ type: CONFIRM_INVENTORY_REQUEST });
    const user = firebaseAuth.currentUser;
    const uid = user ? user.uid : null;
    const inventoryRef = rtdb.ref(`contractors/${uid}/inventory`);
    inventoryRef
        .set(newInventory)
        .then(() => {
            dispatch(dropdownAlert(true, 'Successfully updated inventory'));
            dispatch({
                type: CONFIRM_INVENTORY_SUCCESS,
                payload: newInventory
            });
        })
        .catch(error => {
            dispatch({ type: CONFIRM_INVENTORY_ERROR, payload: error });
        });
};

export const addToInventory = product => ({
    type: ADD_TO_INVENTORY,
    payload: product
});

export const removeFromInventory = product => ({
    type: REMOVE_FROM_INVENTORY,
    payload: product
});

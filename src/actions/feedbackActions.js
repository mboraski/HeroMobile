import { rtdb, firebaseAuth } from '../../firebase';

export const OPEN_FEEDBACK_REQUEST = 'open_feedback_request';
export const OPEN_FEEDBACK_SUCCESS = 'open_feedback_success';
export const OPEN_FEEDBACK_ERROR = 'open_feedback_error';
export const PRODUCT_REQUEST_REQUEST = 'open_feedback_request';
export const PRODUCT_REQUEST_SUCCESS = 'open_feedback_success';
export const PRODUCT_REQUEST_ERROR = 'open_feedback_error';
export const OPEN_REQUEST_POPUP = 'open_request_popup';
export const CLOSE_REQUEST_POPUP = 'close_request_popup';

const OPEN_FEEDBACK_REF = 'consumerOpenFeedback';
const PRODUCT_REQUEST_REF = 'productRequestFeedback';

export const sendOpenFeedback = (message, timestamp) => async dispatch => {
    dispatch({ type: OPEN_FEEDBACK_REQUEST });
    try {
        if (firebaseAuth.currentUser) {
            const uid = firebaseAuth.currentUser.uid;
            const openFeedbackRef = rtdb.ref(`${OPEN_FEEDBACK_REF}/${uid}`);
            const newFeedback = await openFeedbackRef.push();
            await newFeedback.set({ message, timestamp });
            dispatch({ type: OPEN_FEEDBACK_SUCCESS });
        }
    } catch (error) {
        console.warn(error);
        dispatch({ type: OPEN_FEEDBACK_ERROR, payload: error });
        // Sentry log Error
    }
};

export const sendProductRequest = (productId, timestamp) => async dispatch => {
    dispatch({ type: PRODUCT_REQUEST_REQUEST });
    try {
        if (firebaseAuth.currentUser) {
            const uid = firebaseAuth.currentUser.uid;
            const productRequestFeedback = rtdb.ref(
                `${PRODUCT_REQUEST_REF}/${uid}`
            );
            const newFeedback = await productRequestFeedback.push();
            await newFeedback.set({ productId, timestamp });
            dispatch({ type: PRODUCT_REQUEST_SUCCESS });
        }
    } catch (error) {
        console.warn(error);
        dispatch({ type: PRODUCT_REQUEST_ERROR, payload: error });
        // Sentry log Error
    }
};

export const openRequestPopup = product => dispatch =>
    dispatch({ type: OPEN_REQUEST_POPUP, payload: product });
export const closeRequestPopup = () => dispatch =>
    dispatch({ type: CLOSE_REQUEST_POPUP });

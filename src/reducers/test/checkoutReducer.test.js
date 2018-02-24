import { setDeliveryNotes } from '../../actions/checkoutActions';
import reducer, { initialState } from '../checkoutReducer';

describe('checkoutReducer', () => {
    it('handles setDeliveryNotes action', () => {
        const notes = 'notes';
        expect(reducer(initialState, setDeliveryNotes(notes))).toMatchSnapshot();
    });
});

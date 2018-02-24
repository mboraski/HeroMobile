import { setDeliveryNotes } from '../checkoutActions';

describe('checkoutActions', () => {
    const notes = 'notes';
    it('creates setDeliveryNotes action', () => {
        expect(setDeliveryNotes(notes)).toMatchSnapshot();
    });
});

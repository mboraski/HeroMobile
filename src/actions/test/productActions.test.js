import { selectDeliveryType } from '../productActions';

describe('productActions', () => {
    it('creates selectDeliveryType action', () => {
        expect(selectDeliveryType('deliveryType')).toMatchSnapshot();
    });
});

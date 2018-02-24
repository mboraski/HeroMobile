import formatCardExpiry from '../formatCardExpiry';

describe('formatCardExpiry', () => {
    it('formatCardNumber works correctly', () => {
        const str = '0123456';
        const expected = '01 / 2345';
        expect(formatCardExpiry(str)).toBe(expected);
    });
});

import formatCardNumber from '../formatCardNumber';

describe('formatCardNumber', () => {
    it('formatCardNumber works correctly', () => {
        const str = '444400004';
        const expected = '4444 0000 4';
        expect(formatCardNumber(str)).toBe(expected);
    });
});

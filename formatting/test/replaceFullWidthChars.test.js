import replaceFullWidthChars from '../replaceFullWidthChars';

describe('replaceFullWidthChars', () => {
    it('replaceFullWidthChars works correctly', () => {
        const str = '\uff11\uff12\uff13\uff14\uff15';
        const expected = '12345';
        expect(replaceFullWidthChars(str)).toBe(expected);
    });
});

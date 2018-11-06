export default function replaceFullWidthChars(str = '') {
    const fullWidth =
        '\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19';
    const halfWidth = '0123456789';

    let value = '';
    const chars = str.split('');

    for (let char of Array.from(chars)) {
        const idx = fullWidth.indexOf(char);
        if (idx > -1) {
            char = halfWidth[idx];
        }
        value += char;
    }

    return value;
}

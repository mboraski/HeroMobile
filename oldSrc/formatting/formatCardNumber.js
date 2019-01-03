import valid from 'card-validator';

export default function formatCardNumber(str) {
    const cardNumber = str.replace(/ /g, '');
    const { card } = valid.number(cardNumber);
    if (card) {
        const offsets = [0].concat(card.gaps).concat([cardNumber.length]);
        const components = [];

        for (let i = 0; offsets[i] < cardNumber.length; i++) {
            const start = offsets[i];
            const end = Math.min(offsets[i + 1], cardNumber.length);
            components.push(cardNumber.substring(start, end));
        }

        return components.join(' ');
    }
    return cardNumber;
}

import { mergeCarts } from '../cartReducerUtils';
import { emptyOldCart } from './testData';

describe('cartReducerUtils', () => {
    describe('#mergeCarts', () => {
        test('real recognize real', () => {
            expect('real').toBe('real');
        });
    });
});

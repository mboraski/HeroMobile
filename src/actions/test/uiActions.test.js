import { toggleSearch, showFeedbackForm, hideFeedbackForm } from '../uiActions';

describe('uiActions', () => {
    it('creates toggleSearch action', () => {
        expect(toggleSearch()).toMatchSnapshot();
    });
    it('creates showFeedbackForm action', () => {
        expect(showFeedbackForm()).toMatchSnapshot();
    });
    it('creates hideFeedbackForm action', () => {
        expect(hideFeedbackForm()).toMatchSnapshot();
    });
});

import { toggleSearch, showFeedbackForm, hideFeedbackForm } from '../../actions/uiActions';
import reducer, { initialState } from '../uiReducer';

describe('uiReducer', () => {
    it('handles toggleSearch action', () => {
        expect(reducer(initialState, toggleSearch())).toMatchSnapshot();
    });
    it('handles showFeedbackForm action', () => {
        expect(reducer(initialState, showFeedbackForm())).toMatchSnapshot();
    });
    it('handles hideFeedbackForm action', () => {
        expect(reducer(initialState, hideFeedbackForm())).toMatchSnapshot();
    });
});

import MenuActions from '../actions/menuActions';

const initialState = {
    isOpened: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MenuActions.MENU_TOGGLE: 
      return Object.assign({}, state, { 
        isOpened: action.isOpened 
      });
    default: 
      return state;
  }
}


import * as types from '../constants/ActionTypes'

const initialState = {
    isOpened: false
}

export default function menu(state = initialState, action){
  switch (action.type) {
    case types.MENU_TOGGLE: 
      console.log('reducer-MENU_TOGGLE: ',action)
      return Object.assign({}, state, { 
        isOpened: action.isOpened 
      });
    default: 
      return state
  }
}


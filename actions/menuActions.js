

import * as ActionTypes from '../constants/ActionTypes'

export default function toggleMenu(isOpened) {
  return {
    type: ActionTypes.MENU_TOGGLE,
    isOpened
  }
}

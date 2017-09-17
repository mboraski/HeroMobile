const ACTIONS = {
  MENU_TOGGLE: 'menu_toggle'
};

const toggleMenu = isOpened => ({
  type: ACTIONS.MENU_TOGGLE,
  isOpened
});

const ACTION_CREATORS = {
  toggleMenu
};

export default { ...ACTIONS, ...ACTION_CREATORS };

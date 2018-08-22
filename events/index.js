const {
    setFullScreen,
    quitFullScreen,
    asyncEvent,
    isMaxScreen,
    isMinScreen,
    restoreScreen,
    isVisibleScreen,
    showScreen,
    isFocusedScreen,
    focusScreen
  } = require('./screen');
  const {
    getVersion
  } = require('./app');
  module.exports = {
    'SET_FULL_SCREEN': setFullScreen,
    'QUIT_FULL_SCREEN': quitFullScreen,
    'ASYNC_EVENT': asyncEvent,
    'IS_MAX_SCREEN': isMaxScreen,
    'IS_MIN_SCREEN': isMinScreen,
    'RESTORE_SCREEN': restoreScreen,
    'IS_VISIBLE_SCREEN': isVisibleScreen,
    'SHOW_SCREEN': showScreen,
    'IS_FOCUS_SCREEN': isFocusedScreen,
    'FOCUS_SCREEN': focusScreen,
    'GET_VERSION': getVersion
  };
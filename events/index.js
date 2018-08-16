const {
    setFullScreen,
    quitFullScreen,
    asyncEvent,
    screenShot
  } = require('./screen.js');
  
  module.exports = {
    'SET_FULL_SCREEN': setFullScreen,
    'QUIT_FULL_SCREEN': quitFullScreen,
    'ASYNC_EVENT': asyncEvent,
    'SCREEN_SHOT': screenShot
  };
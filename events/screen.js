

//进入全屏
function setFullScreen(params, __base) {
  return __base.win.setFullScreen(true);
}

//退出全屏
function quitFullScreen(params, __base) {
  return __base.win.setFullScreen(false);
}

function asyncEvent(params) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
}


module.exports = {
  setFullScreen,
  quitFullScreen,
  asyncEvent
};
//进入全屏
function setFullScreen(params = {}, __base) {
  return __base.win.setFullScreen(true);
}

//退出全屏
function quitFullScreen(params = {}, __base) {
  return __base.win.setFullScreen(false);
}
//是否是最小化窗口
function isMinScreen(params = {}, __base) {
  const _result = __base.win.isMinimized() ? 1 : 0;
  return _result
}
//是否最大化窗口
function isMaxScreen(params = {}, __base) {
  const _result = __base.win.isMaximized() ? 1 : 0;
  return _result
}
//从最小化状态恢复到当前状态
function restoreScreen(params = {}, __base) {
  return __base.win.restore()
}
//窗口是否可见
function isVisibleScreen(params = {}, __base) {
  const _result = __base.win.isVisible() ? 1 : 0
  return _result
}
//窗口是否聚焦
function isFocusedScreen(params = {}, __base) {
  const _result =  __base.win.isFocused() ? 1 : 0
  return _result
}
//窗口聚焦
function focusScreen(params = {}, __base) {
  return __base.win.focus()
}
//设置窗口显示并是否聚焦
function showScreen(params = {}, __base) {
  if (params = {}.notFocus) return __base.win.showInactive()
  return __base.win.show()
}

function asyncEvent(params = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
}


module.exports = {
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
};
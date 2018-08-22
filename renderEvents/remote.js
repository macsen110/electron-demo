var { remote, desktopCapturer } = require('electron');
var fs = require('fs');
// var _ = require('lodash');
var url = require('url');
var path = require('path');
var BrowserWindow = remote.BrowserWindow;
var w = screen.width;
var h = screen.height;
var win = null;
/**
 * 创建截屏窗口
 */
function createChildWin(_url, opts, imgData) {
  const scriptsContent = 'module.exports="' + String(imgData) + '"';
  fs.writeFileSync(path.join(__dirname, '../renderTpl/remote/shotScreen/imgData.js'), scriptsContent);
  var config = {
    fullscreen: true,
    transparent: true, /* new add line */
    frame: false
  }
  config = Object.assign(config, opts)
  var _win = new BrowserWindow(config);
  _win.loadURL(url.format({
    pathname: path.join(__dirname, _url),
    protocol: 'file',
    slashes: true
  }))  
  _win.webContents.openDevTools()
  _win.on('closed', () => {
    _win = null;
  })
  _win.on('close', () => {
    _win = null;
  })
  return _win;
}

function shotScreen() {
  if (!win) {
    capturer().then(function (data) {
      win = createChildWin('../renderTpl/remote/shotScreen/index.html', { 
        fullscreen: true, 
        width: 900, 
        height: 800, 
        alwaysOnTop: true, 
        skipTaskbar: false, 
        autoHideMenuBar: true
      }, data);
      return data
    });
  }
  return win;
}

/**
 * 截取屏幕资源到本地
 */
function capturer() {
  return new Promise(function (resolve, reject) {
    return desktopCapturer.getSources(
      {
        types: ['window', 'screen'],
        thumbnailSize: { width: w, height: h }
      },
      (error, sources) => {
        if (error) console.error(error);
        localStorage['image'] = sources[0].thumbnail.toDataURL();
        resolve(sources[0].thumbnail.toDataURL())
      }
    )
  })
}

module.exports = {
  shotScreen
}
// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

/**
 * tools for electron APP
 */

function isPromise(obj) {
  const toString = Object.prototype.toString;
  return toString.call(obj) === '[object Promise]';
}



 /**
  * 
  */
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    webPreferences: {
      preload: path.join(__dirname, './bridge'),
      plugins: true
    }
  });

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  //获取创建好的window对象发送消息
  win.webContents.on('did-finish-load', function () {
    win.webContents.send('set-env', { //设置web环境变量
      __ELECTRON__: true,
      __DEV__: true,
      __PRO__: false,
      __SERVER__: false,
      windowLoaded: true
    });
  });



}

//main.js

//监听对原生的调用
ipcMain.on('regist-event', (event, arg) => {
  const nativeEvent = eventsList[arg.eventName];
  if (nativeEvent) {
    const result = nativeEvent(app, win, arg.params);
    if (isPromise(result)) {
      result.then(res => {
        event.sender.send('fire-event', {
          stamp: arg.stamp,
          payload: res
        });
      }).catch(err => {
        event.sender.send('fire-event', {
          stamp: arg.stamp,
          err
        });
      });
    } else {
      event.sender.send('fire-event', {
        stamp: arg.stamp,
        payload: result
      });
    }
  } else {
    event.sender.send('fire-event', {
      stamp: arg.stamp,
      err: new Error('event not support')
    });
  }
});


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const electron = require('electron');
const { app, BrowserWindow, dialog, Menu, shell } = electron;
const isDev = require('electron-is-dev');
const path = require('path');
const events = require('./events/index.js');
const { registEvents } = require('./tunnel/index.js');
const elecronUpdate = require('./update');
const menuTemplate = require('./menu')
const loadURL = isDev ? 'http://10.6.52.31:8082' : 'http://m.111.com.cn:8881/#/';
process.env.NODE_ENV = 'production'
var win = '';

app.on('ready', () => {
  win = new BrowserWindow({
    width: 1500,
    height: 1200,
    backgroundColor: '#2e2c29',
    webPreferences: {
      preload: path.join(__dirname, './bridge.js'),
      plugins: true,
      nodeIntegration: false,
    }
  });

  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
  //监听web对原生事件的调用
  registEvents(events, {
    app,
    win,
    shell,
    dialog
  });

  win.loadURL(loadURL);

  isDev && win.webContents.openDevTools();

  win.on('closed', function () {
    app.quit();
  });
  elecronUpdate.init(win, dialog)
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  app.quit();
});
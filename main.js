const electron = require('electron');
const { app, BrowserWindow } = electron;
const log = require('electron-log');
const {autoUpdater} = require("electron-updater");
const events = require('./events/index.js');
const path = require('path');

const {registEvents} = require('./tunnel/index.js');
const win;
app.on('ready', () => {
  win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, './index.js'),
      plugins: true,
      nodeIntegration: false,
    }
  });

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');
function sendStatusToWindow(text) {
  log.info(text);
  win.webContents.send('message', text);
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded');
});




  //监听web对原生事件的调用
  registEvents(events, [app, win]);

  win.loadURL(`https://www.macsen318.com`);

  win.webContents.openDevTools();

  win.on('closed', function() {
    app.quit();
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  app.quit();
});
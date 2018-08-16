const electron = require('electron');
const { app, BrowserWindow, dialog } = electron;
const log = require('electron-log');
const autoUpdater = require('electron').autoUpdater;
const events = require('./events/index.js');
const path = require('path');
const isDev = require('electron-is-dev');
process.env.NODE_ENV = 'production'
var win = '';
const {registEvents} = require('./tunnel/index.js');
console.log(autoUpdater)

// autoUpdater.logger = log;
// autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');
function sendStatusToWindow(text) {
  log.info(text);
  setTimeout(() => win.webContents.send('message', text), 5000);
}
//setTimeout(() => win.webContents.send('message', 'ready'), 10000);
autoUpdater.on('checking-for-update', () => {
  dialog.showMessageBox({
    title: 'Check',
    message: 'Checking for update....'
  })
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  dialog.showMessageBox({
    title: 'update-available',
    message: 'update-available'
  })
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  dialog.showMessageBox({
    title: 'update not available',
    message: 'update not available'
  })
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
  dialog.showMessageBox({
    title: 'progress',
    message: 'log_message'
  })
});



app.on('ready', () => {
  win = new BrowserWindow({
    width: 1500,
    height: 1200,
    webPreferences: {
      preload: path.join(__dirname, './index.js'),
      plugins: true,
      nodeIntegration: false,
    }
  });

  //监听web对原生事件的调用
  registEvents(events, [app, win]);

  win.loadURL(`http://localhost:8081/#/`);

  win.webContents.openDevTools();

  win.on('closed', function() {
    app.quit();
  });
  setTimeout(() => autoUpdater.checkForUpdates(), 5000);
  // dialog.showMessageBox({
  //   title: 'start',
  //   message: 'check...'
  // })
  //sendStatusToWindow('app ready to check');
  autoUpdater.setFeedURL('https://www.macsen318.com/api/home/')
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  app.quit();
});
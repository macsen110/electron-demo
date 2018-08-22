const { autoUpdater } = require('electron-updater');
const {sendMsgToWin} = require('../tools');
const log = require('electron-log')
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
let win;
let dialog;
autoUpdater.on('checking-for-update', () => {
  dialog.showMessageBox({
    title: 'Check',
    message: 'Checking for update....'
  })
  sendMsgToWin(win, 'Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  dialog.showMessageBox({
    title: 'update-available',
    message: 'update-available'
  })
  sendMsgToWin(win, 'Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  dialog.showMessageBox({
    title: 'update not available',
    message: 'update not available'
  })
  sendMsgToWin(win, 'Update not available.');
})
autoUpdater.on('error', (err) => {
  sendMsgToWin(win, 'Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendMsgToWin(win, log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendMsgToWin(win, 'Update downloaded');
  dialog.showMessageBox({
    title: 'progress',
    message: 'log_message'
  })
  autoUpdater.quitAndInstall();
});
exports.init = (_window, _dialog) => {
  win = _window;
  dialog = _dialog;
  // setTimeout(() => autoUpdater.checkForUpdatesAndNotify(), 5000);
  // autoUpdater.setFeedURL('https://www.macsen318.com/api/home/')
}
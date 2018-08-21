exports.sendMsgToWin = (_win, text) => {
  setTimeout(() => _win.webContents.send('message', text), 0);
}
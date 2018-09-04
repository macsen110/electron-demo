const shell = require('electron').shell
module.exports = {
  openExternal: (obj) => shell.openExternal(obj.url)
}

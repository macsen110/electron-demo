const { ipcRendererSetup, callEvent } = require('./callEvent');
const { ipcMainSetup, registEvents } =require('./registEvents');
module.exports = {
    ipcRendererSetup,
    ipcMainSetup,
    callEvent,
    registEvents
};

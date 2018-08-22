const { FIRE_CHANNEL, CALLBACK_CHANNEL } = require('./const');
const { ipcRenderer} = require('electron');;
const renderEventsMap = require('../renderEvents');
const eventsStack = {};
let id = 0;
let ifIpcRenderSetUp = false;
const ipcRendererSetup = () => {
    if (ifIpcRenderSetUp) {
        return;
    }
    else {
        ifIpcRenderSetUp = true;
    }
    ipcRenderer.on('message', (event, message) => {
        console.log(message)
    })
    ipcRenderer.on(CALLBACK_CHANNEL, (e, arg) => {
        const event = eventsStack[arg.id];
        if (event) {
            if (arg.err) {
                event.reject(new Error(arg.err));
            }
            else {
                event.resolve(arg.payload);
            }
            delete eventsStack[arg.id];
        }
    });
}
if (typeof window !== 'undefined') {
    ipcRendererSetup();
}
exports.ipcRendererSetup = ipcRendererSetup
exports.version = '0.0.1'
// 调用原生事件
exports.callEvent = (eventName, params = {}) => {
    if (renderEventsMap[eventName]) return renderEventsMap[eventName](params)
    id++;
    return new Promise((resolve, reject) => {
        const event = Object.assign({ id: String(id) }, { eventName }, { params });
        eventsStack[id] = { resolve, reject }; // 注册唯一函数
        ipcRenderer.send(FIRE_CHANNEL, event); // 发送事件
    });
}

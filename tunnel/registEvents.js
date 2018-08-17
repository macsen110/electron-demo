/**
 * 监听渲染进程对主进程的调用，执行完任务后通知渲染进程
 */
const Electron = require('electron');
const { FIRE_CHANNEL, CALLBACK_CHANNEL } = require('./const');
const { ipcMain } = Electron;
function isPromise(obj) {
    const toString = Object.prototype.toString;
    return toString.call(obj) === '[object Promise]';
}
let eventsList;
let cusParams;
let ifIpcMainSetUp = false;
// 监听对原生的调用
const ipcMainSetup = () => {
    if (ifIpcMainSetUp) {
        return;
    }
    else {
        ifIpcMainSetUp = true;
    }
    ipcMain.on(FIRE_CHANNEL, (event, arg) => {
        const { id, eventName, params } = arg;
        const nativeEvent = eventsList[eventName];
        // 主进程不支持的事件
        if (!nativeEvent) {
            event.sender.send(CALLBACK_CHANNEL, {
                id,
                err: 'event not support'
            });
            return;
        }
        // 主进程支持的事件
        const result = nativeEvent(params, cusParams);
        if (isPromise(result)) { // 如果返回promise
            result.then(res => {
                event.sender.send(CALLBACK_CHANNEL, {
                    id,
                    payload: res
                });
            }).catch(err => {
                event.sender.send(CALLBACK_CHANNEL, {
                    id,
                    err: err.message
                });
            });
        }
        else {
            event.sender.send(CALLBACK_CHANNEL, {
                id,
                payload: result
            });
        }
    });
}
if (typeof window === 'undefined') {
    ipcMainSetup();
}
exports.ipcMainSetup = ipcMainSetup
exports.registEvents = (events, params) => {
    eventsList = events;
    cusParams = params;
}

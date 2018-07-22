import * as Electron from 'electron';
import { FIRE_CHANNEL, CALLBACK_CHANNEL } from './const';
const { ipcRenderer } = Electron;
const eventsStack = {};
let id = 0;
let ifIpcRenderSetUp = false;
export function ipcRendererSetup() {
    if (ifIpcRenderSetUp) {
        return;
    }
    else {
        ifIpcRenderSetUp = true;
    }
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
// 调用原生事件
export function callEvent(eventName, params = {}) {
    id++;
    return new Promise((resolve, reject) => {
        const event = Object.assign({ id: String(id) }, { eventName }, { params });
        eventsStack[id] = { resolve, reject }; // 注册唯一函数
        ipcRenderer.send(FIRE_CHANNEL, event); // 发送事件
    });
}

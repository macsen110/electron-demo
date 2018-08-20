const { callEvent, version } = require('./tunnel/callEvent');
window.__electronCallEvent = callEvent;
window.__electronVersion = version
window.ELECTRON_ENABLE_SECURITY_WARNINGS = false
// setTimeout(() => window.__electronCallEvent('SCREEN_SHOT'), 2000)
/**
 * 主进程中处理screen相关的事件
 */

const {desktopCapturer, screen, shell} = require('electron')
const fs = require('fs')
const os = require('os')
const path = require('path')

//进入全屏
function setFullScreen(params, app, win) {
    return win.setFullScreen(true);
  }
  
  //退出全屏
  function quitFullScreen(params, app, win) {
    return win.setFullScreen(false);
  }
  
  function asyncEvent(params) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(params.word);
        resolve();
      }, 3000);
    });
  }
  //截屏
  function screenShot(params) {
    screenshotMsg.textContent = 'Gathering screens...'
    const thumbSize = determineScreenShotSize()
    let options = { types: ['screen'], thumbnailSize: thumbSize }
  
    desktopCapturer.getSources(options, (error, sources) => {
      if (error) return console.log(error)
  
      sources.forEach((source) => {
        if (source.name === 'Entire screen' || source.name === 'Screen 1') {
          const screenshotPath = path.join(os.tmpdir(), 'screenshot.png')
  
          fs.writeFile(screenshotPath, source.thumbnail.toPNG(), (error) => {
            if (error) return console.log(error)
            shell.openExternal(`file://${screenshotPath}`)
  
            const message = `Saved screenshot to: ${screenshotPath}`
            screenshotMsg.textContent = message
          })
        }
      })
    })
  }
  
  function determineScreenShotSize () {
    const screenSize = screen.getPrimaryDisplay().workAreaSize
    const maxDimension = Math.max(screenSize.width, screenSize.height)
    return {
      width: maxDimension * window.devicePixelRatio,
      height: maxDimension * window.devicePixelRatio
    }
  }

  module.exports = {
    setFullScreen,
    quitFullScreen,
    asyncEvent,
    screenShot
  };
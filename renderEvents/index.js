const fs = require('fs')
const os = require('os')
const path = require('path')
const {desktopCapturer, screen, shell} = require('electron')
const downloadsFolder = require('downloads-folder');
/**
 * 获取屏幕尺寸
 */
exports.determineScreenShotSize = () => {
  const screenSize = screen.getPrimaryDisplay().workAreaSize
  const maxDimension = Math.max(screenSize.width, screenSize.height)
  return {
    width: maxDimension * window.devicePixelRatio,
    height: maxDimension * window.devicePixelRatio
  }
}
/**
 * 截屏
 */
exports.screenShot = () => {
  const thumbSize = this.determineScreenShotSize()
  let options = { types: ['screen'], thumbnailSize: thumbSize }
  desktopCapturer.getSources(options, (error, sources) => {
    if (error) return console.log(error)
    sources.forEach((source) => {
      if (source.name === 'Entire screen' || source.name === 'Screen 1') {
        const screenshotPath = path.join(downloadsFolder(), 'screenshot.png')
        fs.writeFile(screenshotPath, source.thumbnail.toPNG(), (error) => {
          if (error) return console.log(error)
          shell.openExternal(`file://${screenshotPath}`)
        })
      }
    })
  })
}

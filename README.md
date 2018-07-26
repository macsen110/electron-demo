1. 打包使用electon-builder 或者 electron-packager
2. 设置镜像为淘宝镜像 
  * .npmrc里面设置ELECTRON_MIRROR
运行一下 export ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
然后在build
3. mac 下面创建wine 快捷方式
sudo ln -s /Applications/Wine\ Stable.app/Contents/Resources/bin/wine /usr/local/bin/wine

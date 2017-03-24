const Config = require('electron-config')

module.exports = new Config({
  defaults: {
    remoteStyleUrl: null,
    lastWindowState: {
      width: 360,
      height: 360 / 0.618
    }
  }
})
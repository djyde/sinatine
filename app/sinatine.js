const path = require('path')
const { app } = require('electron').remote

const customJS = path.join(app.getPath('appData'), app.getName(), 'custom.js')

require(customJS)

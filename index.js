const path = require('path');
const fs = require('fs');
const electron = require('electron');
const http = require('http')
const axios = require('axios')
// const appMenu = require('./menu');
// const tray = require('./tray');
// const config = require('./config');



const app = electron.app;

// require('electron-debug')();
// require('electron-dl')();
// require('electron-context-menu')();

let mainWindow;
let isQuitting = false;

const patchRemoteStyle = (page, url) => {
  if (!url) {
    page.insertCSS(fs.readFileSync(path.join(__dirname, 'custom.css'), 'utf8'));
    return
  }
  axios.get(url)
    .then(res => {
      page.insertCSS(res.data)
    })
    .catch(e => {
      // fetch failed, use local css
      page.insertCSS(fs.readFileSync(path.join(__dirname, 'custom.css'), 'utf8'));
    })
}

const isAlreadyRunning = app.makeSingleInstance(() => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    mainWindow.show();
  }
});

if (isAlreadyRunning) {
  app.quit();
}

function createMainWindow() {
  const maxWindowInteger = 2147483647; // Used to set max window width/height when toggling fullscreen
  const maxWidthValue = 850;

  const win = new electron.BrowserWindow({
    titleBarStyle: 'hidden-inset',
    width: 360,
    height: 360 / 0.618, 
    minWidth: 300,
    maxWidth: 500,
    maxHeight: 500 / 0.618
  });

  if (process.platform === 'darwin') {
    win.setSheetOffset(40);
  }

  win.loadURL('http://m.weibo.cn/beta');

  win.on('close', e => {
    if (!isQuitting) {
      e.preventDefault();

      if (process.platform === 'darwin') {
        app.hide();
      } else {
        win.hide();
      }
    }
  });

  win.on('page-title-updated', e => {
    e.preventDefault();
  });

  win.on('enter-full-screen', () => {
    win.setMaximumSize(maxWindowInteger, maxWindowInteger);
  });

  win.on('leave-full-screen', () => {
    win.setMaximumSize(maxWidthValue, maxWindowInteger);
  });

  return win;
}

app.on('ready', () => {
  // electron.Menu.setApplicationMenu(appMenu);
  mainWindow = createMainWindow();
  // tray.create(mainWindow);

  const page = mainWindow.webContents;

  page.on('dom-ready', () => {
    page.insertCSS(fs.readFileSync(path.join(__dirname, 'browser.css'), 'utf8'));
    patchRemoteStyle(page)
    mainWindow.show();
  });

  page.on('new-window', (e, url) => {
    e.preventDefault();
    electron.shell.openExternal(url);
  });
});

app.on('activate', () => {
  mainWindow.show();
});

app.on('before-quit', () => {
  isQuitting = true;

  if (!mainWindow.isFullScreen()) {
    // config.set('lastWindowState', mainWindow.getBounds());
  }
});
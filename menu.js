const { app, Menu, BrowserWindow, shell } = require('electron')
const appName = app.getName();
const { mainWindow } = require('./index')

const getMainWindow = () => {
  return BrowserWindow.getAllWindows()[0]
}

const getMainWindowWebContents = () => {
  const win = getMainWindow()
  if (win) {
    return win.webContents
  } else {
    return {}
  }
}

const darwinTpl = [
  {
    label: appName,
    submenu: [
      {
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        type: 'separator'
      },
      {
        label: 'Log Out',
        click() {
          // sendAction('log-out');
        }
      },
      {
        type: 'separator'
      },
      {
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        role: 'undo'
      },
      {
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        role: 'cut'
      },
      {
        role: 'copy'
      },
      {
        role: 'paste'
      },
      {
        role: 'pasteandmatchstyle'
      },
      {
        role: 'delete'
      },
      {
        role: 'selectall'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Go Forward',
        accelerator: 'CommandOrControl + Right',
        click() {
          getMainWindowWebContents().goForward()
        }
      },
      {
        label: 'Go Back',
        accelerator: 'CommandOrControl + Left',
        click() {
          getMainWindowWebContents().goBack()
        }
      },
      {
        label: 'Home',
        accelerator: 'CommandOrControl + r',
        click() {
          getMainWindowWebContents().loadURL('http://m.weibo.cn/beta')
        }
      },
      {
        label: 'Open External',
        accelerator: 'CommandOrControl + o',
        click() {
          const url = getMainWindowWebContents().getURL()
          shell.openExternal(url)
        }
      }
    ]
  },
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      },
      {
        type: 'separator'
      },
      {
        label: 'Next Tab',
        accelerator: 'Ctrl+Tab',
        click() {
          // sendAction('next-tab');
        }
      },
      {
        label: 'Previous Tab',
        accelerator: 'Ctrl+Shift+Tab',
        click() {
          // sendAction('previous-tab');
        }
      },
      {
        type: 'separator'
      },
      {
        role: 'front'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  },
  {
    role: 'help',
    // submenu: helpSubmenu
  }
];

module.exports = Menu.buildFromTemplate(darwinTpl)
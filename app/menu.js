const { app, Menu, BrowserWindow, shell } = require('electron')
const appName = app.getName()
const path = require('path')
const os = require('os')

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
        label: 'Preferences',
        submenu: [
          {
            label: 'Edit CSS',
            click () {
              shell.showItemInFolder(path.join(app.getPath('appData'), app.getName(), 'custom.css'))
            }
          },
          {
            label: 'Edit JS',
            click () {
              shell.showItemInFolder(path.join(app.getPath('appData'), app.getName(), 'custom.js'))
            }
          }
        ]
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
        click () {
          getMainWindowWebContents().goForward()
        }
      },
      {
        label: 'Go Back',
        accelerator: 'CommandOrControl + Left',
        click () {
          getMainWindowWebContents().goBack()
        }
      },
      {
        label: 'Home',
        accelerator: 'CommandOrControl + r',
        click () {
          getMainWindowWebContents().loadURL('http://m.weibo.cn/beta')
        }
      },
      {
        label: 'Open External',
        accelerator: 'CommandOrControl + o',
        click () {
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
        role: 'front'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Source on Github',
        click () {
          shell.openExternal('https://github.com/djyde/sinatine')
        }
      },
      {
        label: 'Report an issue...',
        click () {
          const body = `
<!-- Please succinctly describe your issue and steps to reproduce it. -->
-
${app.getName()} ${app.getVersion()}
Electron ${process.versions.electron}
${process.platform} ${process.arch} ${os.release()}`

          shell.openExternal(`https://github.com/djyde/sinatine/issues/new?body=${encodeURIComponent(body)}`)
        }
      }
    ]
  }
]

module.exports = Menu.buildFromTemplate(darwinTpl)

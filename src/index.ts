import { 
  app, 
  BrowserWindow,
  Menu,
  autoUpdater,
  dialog
 } from 'electron';
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;
let mainWindow: BrowserWindow = null
// const server = 'https://dudu.fhw.vercel.app'
// const url = `${server}/update/${process.platform}/${app.getVersion()}`
// autoUpdater.setFeedURL({url})
// autoUpdater.checkForUpdates()
// autoUpdater.on('update-downloaded', (event: any, releaseNotes: any, releaseName: any) => {
//   const dialogOpts = {
//     type: 'info',
//     buttons: ['Restart', 'Later'],
//     title: 'Application Update',
//     message: process.platform === 'win32' ? releaseNotes : releaseName,
//     detail: 'A new version has been downloaded. Restart the application to apply the updates.'
//   }

//   dialog.showMessageBox(dialogOpts).then((returnValue) => {
//     if (returnValue.response === 0) autoUpdater.quitAndInstall()
//   })
// })
// autoUpdater.on('error', message => {
//   console.error('There was a problem updating the application')
//   console.error(message)
// })
const template: any[] = [
  {
    label: '编辑',
    submenu: [
      {
        label: '加载',
        role: 'reload'
      },
      {
        label: '返回',
        click: function() {
          if (mainWindow.webContents.canGoBack()) {
            mainWindow.webContents.goBack()
          }
          // if (mainWindow) {
          //   mainWindow.webContents.send("monkey", app.getAppPath())
          // }
        }
      }
    ]
  },
  {
    label: '关于',
    click: function() {
      dialog.showMessageBoxSync(null, {
        title: "dudu软件",
        message: app.getVersion()
      })
    }
  }
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  console.log("version=====>", app.getVersion())
  console.log("appPath---->", app.getAppPath())
  console.log("pwd--->", process.cwd())
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`${MAIN_WINDOW_WEBPACK_ENTRY}`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

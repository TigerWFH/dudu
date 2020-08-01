const {app, BrowserWindow} = require('electron')
console.log("===>", require('electron'))

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: true
    })

    win.loadFile('index.html')
    win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()

    app.on('active', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})


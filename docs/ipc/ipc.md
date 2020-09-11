# vscode IPC系统分析
## 通信基础
* `vscode提供的接口：ipcMain和ipcRender`
```js
// main process
const win1 = new BrowserWindow()
const win2 = new BrowserWindow()
ipcMain.on("message", (event, ...args) => {
    console.log("main===>", args)
})
win1.webContents.send("message", "args1")
// render process1
ipcRender.on("message", (event, ...args) => {
    console.log("render1===>", args)
})
ipcRender.send("message", "args11")
// render process2
ipcRender.on("message", (event, ...args) => {
    console.log("render2===>", args)
})
ipcRender.send("message", "args21")
// 其中,message就是channel
```
## 通信协议：IMessagePassingProtocol
* `sender:`发送消息
* `onMessage:`注册事件
## 通信频道：IChannel、IServerChannel

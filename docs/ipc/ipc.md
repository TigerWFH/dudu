# vscode IPC系统分析
## IPC：进程间通信机制，进程间通信是指进程之间交换信息
## IPC实现方式
* `共享内存：`在通信的进程之间存在一块可以直接访问的共享空间。是最快的可用IPC，是针对其它通信机制运行效率较低而设计的。
* `消息传递：`进程间的数据交换是以格式化的消息为单位的，通过系统提供的发送消息和接收消息两个原子操作进行数据交换
* `管道通信：`所谓管道，是指用于连接一个读进程和一个写进程以实现他们之间通信的一个共享文件，又名pipe文件。
* `套接字：`
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
```
通信频道，分为server和client，server监听消息，client发送消息
频道的服务端：IChannelServer，ChannelServer，维护所有的频道
频道的客户端：IChannelClient，ChannelClient
客户端的频道：IChannel
服务端的频道：IServerChannel
备注：IPCClient和IPCServer都继承了IChannelServer和IChannelClient

频道功能：点播（call）和监听（listen）
```
## 连接：
* `Connection:每一个Connection会存储channelServer、channelClient、ctx（来自Client，即window）`
* `IConnection:会存储connections列表， 增加和删除Connection的回调`
```
    一个连接有两种场景：
        1、客户端连接服务端
        2、客户端连接了服务端的某个服务（或者频道）
    客户端（IPCClient）：发起连接的一端
    服务端（IPCServer）：被连接的一端，会实现IConnectionHub
```
## vscode应用
```js
    // codeMain
    class Server extends IPCServer {

    }
    class Client<TContent=string> extends IPCClient<TContext> {
        + {static} Client<TContext> fromSocket<TContext=string>(ISocket socket, TContext id)
        get Event<void> onClose
        Client(Protocol|PersistentProtocol protocol, TContext id, IIPCLogger ipcLoger)
        + void dispose()
    }
    function server(param: any): Promise<Server> {
        return new Promise<Server>((c, e) => {
            // net模块的createServer，可以创建tcp或ipc服务器，依赖于listen函数
            const server = createServer()

            server.on('err0r', e)
            server.listen(hook, () => {
                server.removeListener('err', e)
                c(new Server(server))
            })
        })
    }
    const server = server('');
    function connect(param: any, clientId): Promise<Client> {
        return 
    }
    // CodeApplication
    class CodeApplication extends Disposable {
        CodeApplication(Server mainIpcServer, IProcessEnviroment userEnv ILogService logService, ...)

    }
```
# electron项目，js试验田
# electron应用更新
* `全量更新：`更细所有文件，包括主应用
* `热更新：`只更新业务应用页面
* `官方更新工具：`利用内置的squirrel框架和Electron的autoUpdate模块
# 搭建免费的部署更新服务器
[Hazel](https://github.com/vercel/hazel)

[Now](https://vercel.com/home#get-started)

[github releases]()

[详细](https://github.com/vercel/hazel)
* `管理地址：`https://vercel.com/dashboard/projects
```
    Hazel – 用于私人或开源应用的更新服务器，可以在 Now 上免费部署。 它从GitHub Releases中拉取更新文件，并且利用 GitHub CDN 的强大性能
    1、注册Now并在Now上部署自己的应用
    2、使用hazel项目，部署能够对接electron的autoupdate模块的应用
        2-1：全局安装vercel： npm i -g vercel
        2-2：克隆hazel项目到本地：git clone https://github.com/zeit/haze
        2-3：进入到hazel目录：cd hazel
        2-4：创建部署配置：vercel -e ACCOUNT="github-account" -e REPOSITORY="github-repository"
```
# 打包工具： electron-packager
# react-router-dom
* `Router:`
* `Route:`
* `IndexRoute:`
* `Redirect:`
* `Switch:`渲染第一个child Route或Redirect
```jsx
    import { Route, Switch } from "react-router";

    let routes = (
        <div>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/:user">
                <User />
            </Route>
            <Route>
                <NoMatch />
            </Route>
        </div>
    );
    // /about会匹配以上三个路由，这样设计的目的是为了可以同时展示侧边栏、面包屑导航、启动页tab
    let routes = (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/:user">
                <User />
            </Route>
            <Route>
                <NoMatch />
            </Route>
        </Switch>
    );
    // 使用Switch，/about则只会匹配第一个child route或redirect
```
* `Link:`
# vscode参考资料
[vscode源码参考资料](https://www.cnblogs.com/liulun/p/11037550.html)
[vscode源码架构分析](https://zhuanlan.zhihu.com/p/96041706)
[vscode架构设计](https://www.jianshu.com/p/1797d7131512)
```
1、vscode采用多进程架构，启动后主要有一下几个进程
    1-1：后台进程：VScode的入口，主要负责管理编辑器生命周期，进程间通信，自动更新，菜单管理等。
    1-2：编辑器窗口：由后台进程启动，本身也是多进程架构
        1-2-1：HTML编写的UI：ActivityBar、SideBar、Panel、Editor、StatusBar、TitleBar
        1-2-2：Nodejs异步IO：FileService、ConfigurationService
        1-2-3：插件宿主进程：插件实例、插件实例
        1-2-4：Debug进程
        1-2-5：Search进程

```
## vscode源码分析
```
    入口：src/main.js
        堆栈：Electron->app.once->onReady->startUp:载入主进程vs/code/electron-main/main
    主进程：vs/code/electron-main/main
        类：class CodeMain vs/code/electron-main/main
        堆栈：new CodeMain().main()->this.startup->this.createServices：创建服务
                                                ->this.initServices
                                                ->启动服务->创建CodeApplication实例，并启动startup->this.openFirstWindow
        类：class CodeApplication
        堆栈 new CodeApplication().startup()->
    服务（Service）
        类：ServiceCollection  vs/platform/instantiation/common/serviceCollection.ts
        类：EnvironmentService vs/platform/environment/node/environmentSErvice.ts
        类：InstantiationService vs/platform/instantiation/common/serviceCollection.ts


```
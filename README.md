# electron项目，js试验田
# electron应用更新
* `全量更新：`更细所有文件，包括主应用
* `热更新：`只更新业务应用页面
* `官方更新工具：`利用内置的squirrel框架和Electron的autoUpdate模块
# 搭建免费的部署更新服务器
[Hazel](https://github.com/vercel/hazel)

[Now](https://vercel.com/home#get-started)

[github releases]()
```
    Hazel – 用于私人或开源应用的更新服务器，可以在 Now 上免费部署。 它从GitHub Releases中拉取更新文件，并且利用 GitHub CDN 的强大性能
    1、注册Now
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
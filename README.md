# electron项目，js试验田
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
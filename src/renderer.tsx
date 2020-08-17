/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
    Router,
    Route,
    Switch
} from 'react-router-dom'
import { createHashHistory } from 'history'
import Home from './pages/home'
import About from './pages/about'
import Demo from './pages/demo'
const { 
    ipcRenderer,
    remote
} = require('electron')
const {
    dialog
} = remote
import './index.css';

const history = createHashHistory()
ipcRenderer.on('monkey', function(event: any, args: any[]) {
    console.log("renderer recieve message args===>", args)
    history.goBack()
})

interface IAppProps {
    history: any
}
function App(props: IAppProps) {

}
const router = <Router history={history}>
    <Switch>
        <Route exact path={'/'} component={Home}></Route>
        <Route exact path={'/about'} component={About}></Route>
        <Route exact path={'/demo'} component={Demo}></Route>
        <Route component={Home}></Route>
    </Switch>
</Router>

ReactDOM.render(router, document.getElementById('home'))
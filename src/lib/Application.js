const { app, BrowserWindow, ipcMain } = require('electron')
const is = require("electron-is")
const isType = require('is-type-of')
const fs = require('fs')
const path = require('path')
const CeApp = require('./CeApp')
const pkg = require('../../package.json')
const getConfig = require('./Env')

// 解决webpack打包不能使用require问题
const requireFunc = typeof __webpack_require__ === 'function' ? __non_webpack_require__ : require

class Appliaction extends CeApp {
  static plugins = []
  static use (plugin, options = {}) {
    if (!plugin) throw 'no found Plugin'
    this.plugins.push({
      plugin,
      options
    })
  }
  constructor (config) {
    const options = getConfig()
    options.plugins = Appliaction.plugins
    super(options)
    this.initialize()

    // const { env, argv } = process
    // const asar = __dirname.indexOf('app.asar') !== -1 ? 'app.asar/' : 'app'
    // const appDir = path.join(process.execPath, "../resources", asar)
    // const dev = is.dev()
    // const cwdDir = process.cwd()

    // let options = {
    //   requireFunc,
    //   appDir,
    //   CE_ENV: dev,
    //   cwdDir,
    //   env: 'prod',
    //   serverScope: '',
    //   type: 'application',
    //   baseDir: path.join(app.getAppPath(), 'electron'),
    //   homeDir: app.getAppPath(),
    //   resourcesDir: path.join(app.getAppPath(), dev ? '' : '../'),
    //   // framework: path.join(app.getAppPath(), 'node_modules', 'ce-core'),
    //   appName: app.getName(),
    //   userHome: app.getPath('home'),
    //   appData: app.getPath('appData'),
    //   appUserData: app.getPath('userData'),
    //   logsDir: app.getPath('logs'),
    //   appVersion: app.getVersion(),
    //   isPackaged: app.isPackaged,
    //   execDir: app.getAppPath()
    // }


    // // argv
    // let hotReload = false
    // for (let i = 0; i < process.argv.length; i++) {
    //   const tmpArgv = process.argv[i]
    //   if (tmpArgv.indexOf('--env=') !== -1 && dev) {
    //     options.env = tmpArgv.substring(6)
    //   }
    //   if (tmpArgv.indexOf('--hot-reload=') !== -1) {
    //     hotReload = tmpArgv.substring(13) == 1 ? true : false
    //   }
    // }


    // env.NODE_ENV = 'production'

    // // normalize env
    // env.CE_ENV = dev
    // env.APP_HOME_DIR = options.APP_HOME_DIR
    // env.CE_SERVER_ENV = options.env
    // env.CE_SERVER_SCOPE = options.serverScope
    // env.CE_USER_HOME = options.userHome
    // env.CE_APP_DATA = options.appData
    // env.CE_APP_USER_DATA = options.appUserData
    // env.CE_VERSION = pkg.version

    // // 小程序目录
    // env.CE_MODULES = dev ? options.APP_HOME_DIR : path.join(process.execPath, '../../')

  }


  /* 初始化 */
  async initialize () {

    await this.ready()

    await this.createElectronApp()

    // this.register()

  }

  /* 插件注册 */
  register () {
    // UI plugins
    if (Appliaction.plugins.length) {
      for (const { plugin: Plugin, options: opts } of Appliaction.plugins) {

        let _Plugin = null
        if (isType.class(Plugin)) {
          _Plugin = new Plugin(this, opts)
        } else {
          _Plugin = Plugin
        }

        // get key name
        let keys = Object.getOwnPropertyNames(isType.class(Plugin) ? Plugin.prototype : Plugin)
        this.handle(keys, _Plugin)
      }
    }
  }

  handle (keys = [], plugin) {
    for (let key of keys) {
      if (key == 'constructor' || typeof plugin[key] !== 'function') continue

      // send/on 模型
      ipcMain.on(key, async (event, ...params) => {
        const result = await plugin[key](event, ...params)
        event.returnValue = result
        event.reply(`${key}`, result)
      })

      // invoke/handle 模型
      ipcMain.handle(key, async (event, ...params) => {
        const result = await plugin[key](event, ...params)
        return result
      })
    }
  }


}

module.exports = Appliaction
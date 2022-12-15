/**
 * 小程序默认生产环境
 */

const log = require('electron-log')

class ProductionConfig {
  options = {}
  constructor () {
    let { execPath, env, argv, cwd } = process
    this.options = {
      NODE_ENV: 'production',

      CE_ENV: 'production',

      APP_ENV: 'prod'
    }
    if (env.CE_APP_DIR) this.options.APP_HOME_DIR = env.CE_APP_DIR

    let keys = Object.getOwnPropertyNames(this.options)
    for (let key of keys) {
      env[key] = this.options[key]
    }



  }

  /* 获取配置 */
  getOptions () {
    return this.options
  }
}


module.exports = ProductionConfig
/**
 * 小程序默认生产环境
 */

const log = require('electron-log')

class ProductionConfig {
  options = {}
  constructor () {
    let { execPath, env, argv, cwd } = process
    log.verbose(env)
    this.options = {
      CE_ENV: 'production'
    }
    if (env.CE_APP_DIR) this.options.APP_HOME_DIR = env.CE_APP_DIR
  }

  /* 获取配置 */
  getOptions () {
    return this.options
  }
}


module.exports = ProductionConfig
/**
 * 小程序默认开发环境
 */
const log = require('electron-log')
class DevelopmentConfig {
  options = {}
  constructor () {
    let { execPath, env, argv, cwd } = process
    this.options = {
      CE_ENV: 'development',
      APP_HOME_DIR: env.CE_APP_DIR,
      APP_RESOURCES_DIR: env.CE_APP_DIR
    }
    env.APP_HOME_DIR = env.CE_APP_DIR
    env.APP_RESOURCES_DIR = env.CE_APP_DIR
  }

  /* 获取配置 */
  getOptions () {
    return this.options
  }
}


module.exports = DevelopmentConfig
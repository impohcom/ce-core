/**
 * 小程序默认开发环境
 */

class DevelopmentConfig {
  options = {}
  constructor () {
    let { execPath, env, argv, cwd } = process
    let cwdDir = cwd()
    this.options = {
      CE_ENV: 'development',
      APP_HOME_DIR: cwdDir,
      APP_RESOURCES_DIR: cwdDir
    }
  }

  /* 获取配置 */
  getOptions () {
    return this.options
  }
}


module.exports = DevelopmentConfig

const is = require("electron-is")
const DefaultConfig = require('./env/env.default')
const DevelopmentConfig = require('./env/env.development')
const ProductionConfig = require('./env/env.production')

const getConfig = (appEnv) => {
  const { argv } = process
  let defaultConfig = new DefaultConfig().getOptions()
  let developmentConfig = {}, productionConfig = {}
  let dev = is.dev()
  let [exe = '', type = '', envType = ''] = argv
  if (!dev) {
    /* 小程序开发模式 */
    if (type === '.' || appEnv === 'development') {
      developmentConfig = new DevelopmentConfig().getOptions()
    }

    /* 小程序生产模式 */
    if (type.indexOf('-launch_appid=') !== -1 || appEnv === 'production') {
      productionConfig = new ProductionConfig().getOptions()
    }
  }


  // 环境配置
  for (let i = 0; i < process.argv.length; i++) {
    const tmpArgv = process.argv[i]
    if (tmpArgv.indexOf('--env=') !== -1 && (dev || type === '.')) {
      defaultConfig.APP_ENV = tmpArgv.substring(6)
    }
  }

  return { ...defaultConfig, ...developmentConfig, ...productionConfig }
}

module.exports = getConfig
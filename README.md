# ce-core 是一个 ce 引擎启动框架

此框架用于electron 小程序开发启动框架使用

此框架还在升级中，兼容electron ，支持win 。
1.0.4 版本新增适配小程序跟electron应用程序小程序 跟 electron应用 可以共用一个 ce-core 依赖




#  模块更新记录
1. 升级electron,升级sqlite3，实现主程序跟视图 单开吊用，升级小程序启动方式，移除历史store，小程序数据存储进 sqlite数据库中
2. 更新模块 process.env , 用于跟视图通讯，改写视图 Module 方法，实现主程序跟渲染程序同步
  


# 生命周期
1. beforeCreate（创建前）
2. created （创建后）
3. beforeMount (载入前)
4. mounted （载入后）

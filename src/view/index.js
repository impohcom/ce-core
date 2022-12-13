/**
 * 视图插件
 */

const { ipcRenderer: ipc } = (require && require('electron')) || window.electron || {}
const Module = require('module').Module
const old_findPath = Module._findPath
const path = require('path')
const { CE_APP_DIR, CE_FILE_DIR, CE_NODE_MODULES } = process.env


// 改写小程序视图插件
Module._findPath = function (request, paths, isMain) {
  if (CE_NODE_MODULES && !paths.includes(CE_NODE_MODULES)) paths.push(CE_NODE_MODULES)
  return old_findPath(request, paths, isMain)
}



/**
 * 发送异步消息（invoke/handle 模型）
 * @param channel
 * @param param
 * @returns {Promise}
 */
const invoke = (channel, ...param) => {
  const message = ipc.invoke(channel, ...param)
  return message
}

/**
 * 发送同步消息（send/on 模型）
 * @param channel
 * @param param
 * @returns {Any}
 */
const sendSync = (channel, ...param) => {
  const message = ipc.sendSync(channel, ...param)
  return message
}




module.exports = {
  $ipc: ipc,
  $invoke: invoke,
  $sendSync: sendSync
}
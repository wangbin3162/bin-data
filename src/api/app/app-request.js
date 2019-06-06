// import request from '../api_request'
import * as api from '../datastore'

// 获取页面参数信息
export function getPageSettings () {
  return api.getPageSettings()
  // return request({
  //   url: '/getPageSettings',
  //   method: 'get'
  // })
}

// 设置页面参数信息
export function setPageSettings (setting) {
  return api.setPageSettings(setting)
}

// 重置页面参数配置
export function resetPageSettings () {
  return api.resetPageSettings()
}

// 初始化所有参数配置
export function initLocalData () {
  return api.initLocalData()
}

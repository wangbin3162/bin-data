/**
 *创建axios服务实例
 */
import httpRequest from 'axios'
import Qs from 'qs'
import { messages } from 'bin-ui'

let baseUrl = process.env.NODE_ENV !== 'production' ? '/' : '/admin'
const service = httpRequest.create({
  baseURL: baseUrl,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  timeout: 60000 // 请求超时时间
})
/**
 * respone拦截器
 */
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      messages({ content: error.response.data, type: 'danger', duration: 5 })
    } else {
      messages({ content: error.message, type: 'danger', duration: 5 })
    }
    return Promise.reject(error)
  }
)

export default service

/**
 * get请求
 * @param url
 * @param data
 */
export function requestGetNoData (url) {
  return service({
    url: url,
    method: 'get'
  })
}

export function requestGet (url, data) {
  return service({
    url: url,
    method: 'get',
    params: data
  })
}

/**
 * post请求
 * @param url
 * @param data
 */
export function requestPost (url, data) {
  return service({
    url: url,
    method: 'post',
    transformRequest: [function (data) {
      data = Qs.stringify(data)
      return data
    }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: data
  })
}

/**
 * post请求
 * @param url
 * @param data
 */
export function requestPost2 (url, data) {
  return service({
    url: url,
    method: 'post',
    data: data
  })
}

/**
 * post请求
 * @param url
 * @param formData
 */
export function requestPostFormData (url, data) {
  return service({
    url: url,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
  })
}

/**
 * 向formData中添加新的项，如果值为null则跳过
 * @param formData FormData
 * @param name 参数名
 * @param value 参数值
 */
export function appendFormData (formData, name, value) {
  if (value != null) {
    formData.append(name, value)
  }
}

export function getBaseUrl () {
  return baseUrl
}

export function requestGet2 (url, data, downloadProcess) {
  return service({
    timeout: 10000 * 60, // 请求超时时间
    url: url,
    method: 'get',
    params: data,
    headers: { 'Content-Type': 'application/octet-stream;charset=utf-8' },
    responseType: 'arraybuffer',
    onDownloadProgress: downloadProcess
  })
}

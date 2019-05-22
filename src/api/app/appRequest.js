import request from '../api_request'

/**
 * 获取查询列表
 */
export function getPageSettings () {
  return request({
    url: '/getPageSettings',
    method: 'get'
  })
}

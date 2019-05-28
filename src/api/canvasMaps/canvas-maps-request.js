// import request from '../api_request'
import * as api from '../datastore'

// 获取所有的maps
export function getCanvasMaps () {
  return api.getCanvasMaps()
  // return request({
  //   url: '/getPageSettings',
  //   method: 'get'
  // })
}

// 修改当前的map
export function setBaseProperty (currentMaps) {
  return api.setBaseProperty(currentMaps)
}

// 增加一个canvasmap
export function addCanvasMap (map) {
  return api.addCanvasMap(map)
}

// 删除一个canvasmap
export function removeCanvasMap (map) {
  return api.removeCanvasMap(map)
}

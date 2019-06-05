// import request from '../api_request'
import * as api from '../datastore'
import { deepClone } from '../../utils/deepClone'

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

// copy一个canvasmap
export function copyCanvasMap (map) {
  let newMap = deepClone(map)// 深拷贝一个对象并修改默认信息，
  newMap.id = 'node-' + ((new Date()).getTime()) // 修改生成的id
  // 修改复制出来的位置信息
  newMap.packageJson.view.x += 20
  newMap.packageJson.view.y += 20
  return api.addCanvasMap(newMap)
}

// 删除一个canvasmap
export function removeCanvasMap (map) {
  return api.removeCanvasMap(map)
}

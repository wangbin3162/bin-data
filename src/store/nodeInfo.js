// 默认拖拽区块信息类
const nodeInfo = {
  id: 'node-id', // 唯一标识
  type: 'node-type', // 类型
  icon: 'ios-browsers', // 区块图标
  innerHTML: 'node-text' // 描述
}
export default function (newInfo) {
  return Object.assign({}, nodeInfo, newInfo)
}

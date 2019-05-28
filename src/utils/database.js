const database = {
  app: {
    width: 1920,
    height: 1080, // 全局面包的宽高
    backgroundColor: '#0d2a42', // 背景颜色
    gridStep: 8 // 栅格间距
  },
  canvasMaps: [
    {
      id: 'node-test', // 唯一标识
      type: 'transform-block', // 类型
      innerHTML: '拖拽区块', // 描述
      baseProperty: { width: 300, height: 200, x: 810, y: 440 } // 每个map对应的基础属性
    }
  ]
}
export default database

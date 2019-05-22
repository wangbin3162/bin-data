const getters = {
  // 画布面板
  canvasPanel: (state) => state.app.canvasPanel,
  // 画布背景色
  backgroundColor: (state) => state.app.backgroundColor,
  // 画布栅格间距
  gridStep: state => state.app.gridStep,
  // 画布缩放
  canvasRange: state => state.app.canvasRange,
  // 参数面板展开
  optionsExpand: state => state.app.optionsExpand,
  // 画布映射数组
  canvasMap: state => state.canvasMaps.canvasMap
}

export default getters

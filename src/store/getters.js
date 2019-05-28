const getters = {
  pageSettings: state => state.app.pageSettings,
  // 画布缩放
  canvasRange: state => state.app.canvasRange,
  // 参数面板展开
  optionsExpand: state => state.app.optionsExpand,
  // 画布映射数组
  canvasMap: state => state.canvasMaps.canvasMap,
  // 当前选中的
  currentSelected: state => state.canvasMaps.singleSelected,
  // 右键菜单信息
  contextMenuInfo: state => state.canvasMaps.contextMenuInfo
}

export default getters

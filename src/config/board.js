// 画板默认布局配置
export default {
  // 编辑器功能：头部组件
  header: {
    // 标题配置
    title: {
      text: '当前工作空间'
    },
    // 该功能数据源
    data: [],
    // 初始化数据
    initData: []
  },
  // 左侧功能栏
  coverage: {
    // 是否启用该功能，true: 启用 false: 不启用
    enable: true,
    // 标题配置
    title: {
      enable: true,
      text: '图层'
    },
    // 样式
    style: {
      width: '180px',
      flex: '0 0 180px'
    }
  },
  // 画布参数配置
  canvas: {
    // 必须配置画布基本参数
    width: 1920,
    height: 1080,
    style: {
      backgroundColor: '#0d2a42'
    }
  },
  // 表单元素配置组件
  options: {
    // 标题配置
    title: {
      enable: true,
      text: '参数设置'
    },
    style: {
      width: '300px'
    }
  }
}

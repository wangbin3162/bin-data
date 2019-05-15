// 画板默认布局配置
export default {
  // 编辑器功能：头部组件
  header: {
    // 是否启用该功能，true: 启用 false: 不启用
    enable: true,
    // 标题配置
    title: {
      enable: true,
      text: '顶栏标题'
    },
    // 该功能数据源
    data: [],
    // 初始化数据
    initData: []
  },
  // 左侧功能栏
  control: {
    // 是否启用该功能，true: 启用 false: 不启用
    enable: true,
    // 标题配置
    title: {
      enable: true,
      text: '资源列表'
    },
    // 该功能数据源
    data: [],
    // 初始化数据
    initData: [],
    // 样式
    style: {
      width: '200px',
      flex: '0 0 200px'
    }
  },
  // 画布参数配置
  canvas: {
    // 必须配置画布基本参数
    width: 1920,
    height: 1080,
    style: {
      backgroundColor: '#fff'
    }
  },
  // 表单元素配置组件
  options: {
    // 是否启用该功能，true: 启用 false: 不启用
    enable: true,
    // 标题配置
    title: {
      enable: true,
      text: '参数设置'
    },
    // 该功能数据源
    data: [],
    // 初始化数据
    initData: [],
    style: {
      width: '300px'
    }
  }
}

// 画板配置文件
export default {
  UI: {
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
    // 编辑器画板
    board: {
      // 是否启用该功能，true: 启用 false: 不启用
      enable: true,
      // 该功能数据源
      data: [],
      // 初始化数据
      initData: [],
      // 工具栏配置
      toolBar: {
        // 是否启用该功能，true: 启用 false: 不启用
        enable: true,
        // 位置，可选值 top-left || top-right || bottom-right || bottom-left
        position: 'top-right',
        style: {
          right: '350px'
        }
      },
      // 刻度尺配置
      scale: {
        // 是否启用该功能，true: 启用 false: 不启用
        enable: false
      }
    },
    // 表单元素配置组件
    options: {
      // 是否启用该功能，true: 启用 false: 不启用
      enable: true,
      // 该功能数据源
      data: [],
      // 初始化数据
      initData: [],
      style: {
        width: '300px'
      }
    },
    // 编辑器功能：脚部组件
    footer: {
      // 是否启用该功能，true: 启用 false: 不启用
      enable: true,
      // 该功能数据源
      data: [],
      // 初始化数据
      initData: []
    }
  },
  // 导出
  output: {
    // 钩子函数
    before: () => {
    },
    after: () => {
    }
  }
}

// 定义左侧导航

const list = [
  {
    type: 'Basic',
    title: '基础',
    children: [
      {
        title: 'Button 按钮',
        name: 'b-button',
        icon: 'logo-youtube',
        nest: {
          enable: true,
          parent: {
            allow: [],
            deny: []
          },
          children: {
            allow: [],
            deny: []
          }
        }
      },
      {
        title: 'Icon 图标',
        name: 'b-icon',
        icon: 'ios-leaf',
        nest: {
          enable: false,
          parent: {
            allow: [],
            deny: []
          },
          children: {
            allow: [],
            deny: []
          }
        }
      }
    ]
  }
]

export default list

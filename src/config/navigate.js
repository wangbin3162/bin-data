// 定义左侧导航

const list = [
  {
    type: 'Basic',
    title: '基础',
    icon: 'ios-browsers',
    children: [
      {
        title: '基本折线图',
        name: 'v-line',
        icon: 'ios-leaf',
        config: {
          title: {
            content: '主标题',
            textStyle: {
              color: 'rgba(255,255,255,0.6)',
              fontSize: 20,
              fontWeight: 'normal'
            }
          }
        },
        view: { width: 500, height: 400, x: 710, y: 340 }
      }
    ]
  }
]

export default list

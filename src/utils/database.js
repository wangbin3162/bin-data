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
      packageJson: {
        title: '基本折线图',
        icon: 'ios-leaf',
        name: 'v-line',
        config: {
          title: {
            content: '主标题',
            textStyle: {
              color: '#ffffff',
              fontSize: 20
            }
          },
          grid: {
            left: 20,
            top: 60,
            right: 20,
            bottom: 30
          },
          legend: {
            show: true,
            textStyle: {
              color: '#ffffff',
              fontSize: 12
            },
            itemGap: 12,
            icon: '',
            position: 'top-center'
          },
          xAxis: {
            show: true,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: {
              color: '#ffffff',
              fontSize: 12
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
            }
          },
          yAxis: {
            show: true,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: {
              color: '#ffffff',
              fontSize: 12
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#fff'
              }
            }
          },
          series: {
            smooth: true
          }
        },
        view: { width: 500, height: 400, x: 400, y: 100 } // 710,340为中间
      }
    }
  ]
}
export default database

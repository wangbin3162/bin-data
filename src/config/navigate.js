import { DEFAULT_COLORS } from '../utils/defaultColors'

const list = [
  {
    type: 'Basic',
    title: '基础',
    icon: 'ios-browsers',
    children: [
      {
        title: '折线图',
        name: 've-line',
        icon: 'ios-leaf',
        api_data: {
          source: [
            { x: '1/1', y: 375 },
            { x: '1/2', y: 200 },
            { x: '1/3', y: 25 },
            { x: '1/4', y: 190 },
            { x: '1/5', y: 90 },
            { x: '1/6', y: 277 }
          ]
        },
        apis: {
          labelMap: { 'x': '类目', 'y': '值', 's': '系列1' }
        },
        config: {
          title: {
            content: '折线图',
            textStyle: {
              color: '#ffffff',
              fontSize: 20
            }
          },
          grid: { left: 20, top: 60, right: 20, bottom: 30 },
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
            axisLabel: {
              color: '#ffffff',
              fontSize: 12,
              rotate: 0
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
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
            axisLabel: {
              color: '#ffffff',
              fontSize: 12
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#fff'
              }
            }
          },
          series: {
            smooth: true, // 可选的
            label: {
              show: false,
              color: '#fff',
              fontSize: 12,
              position: 'top'
            },
            areaStyle: { // 可选的
              opacity: 0
            }
          },
          colors: DEFAULT_COLORS
        },
        view: { width: 500, height: 400, x: 710, y: 340 } // 计算中间值(1920-500)*0.5,(1080-400)*0.5
      },
      {
        title: '柱状图',
        name: 've-histogram',
        icon: 'ios-leaf',
        api_data: {
          source: [
            { x: '1/1', y: 375, s: '系列1' },
            { x: '1/2', y: 200, s: '系列1' },
            { x: '1/3', y: 25, s: '系列1' },
            { x: '1/4', y: 190, s: '系列1' },
            { x: '1/5', y: 90, s: '系列1' },
            { x: '1/6', y: 277, s: '系列1' },
            { x: '1/1', y: 123, s: '系列2' },
            { x: '1/2', y: 41, s: '系列2' },
            { x: '1/3', y: 112, s: '系列2' },
            { x: '1/4', y: 56, s: '系列2' },
            { x: '1/5', y: 122, s: '系列2' },
            { x: '1/6', y: 323, s: '系列2' }
          ]
        },
        apis: {
          labelMap: {
            'x': '类目',
            'y': '值',
            's': '系列1'
          }
        },
        config: {
          title: {
            content: '柱状图',
            textStyle: {
              color: '#ffffff',
              fontSize: 20
            }
          },
          grid: { left: 20, top: 60, right: 20, bottom: 30 },
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
            axisLabel: {
              color: '#ffffff',
              fontSize: 12,
              rotate: 0
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
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
            axisLabel: {
              color: '#ffffff',
              fontSize: 12
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#fff'
              }
            }
          },
          series: {
            label: {
              show: false,
              color: '#fff',
              fontSize: 12,
              position: 'top'
            },
            barWidth: 'auto' // 可选
          },
          colors: DEFAULT_COLORS
        },
        view: { width: 500, height: 400, x: 710, y: 340 }
      },
      {
        title: '条形图',
        name: 've-bar',
        icon: 'ios-leaf',
        api_data: {
          source: [
            { x: '1/1', y: 375, s: '系列1' },
            { x: '1/2', y: 200, s: '系列1' },
            { x: '1/3', y: 25, s: '系列1' },
            { x: '1/4', y: 190, s: '系列1' },
            { x: '1/5', y: 90, s: '系列1' },
            { x: '1/6', y: 277, s: '系列1' },
            { x: '1/1', y: 123, s: '系列2' },
            { x: '1/2', y: 41, s: '系列2' },
            { x: '1/3', y: 112, s: '系列2' },
            { x: '1/4', y: 56, s: '系列2' },
            { x: '1/5', y: 122, s: '系列2' },
            { x: '1/6', y: 323, s: '系列2' }
          ]
        },
        apis: {
          labelMap: {
            'x': '类目',
            'y': '值',
            's': '系列1'
          }
        },
        config: {
          title: {
            content: '条形图',
            textStyle: {
              color: '#ffffff',
              fontSize: 20
            }
          },
          grid: { left: 20, top: 60, right: 20, bottom: 30 },
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
            axisLabel: {
              color: '#ffffff',
              fontSize: 12,
              rotate: 0
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#cccccc'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#cccccc'
              }
            }
          },
          yAxis: {
            show: true,
            axisLabel: {
              color: '#ffffff',
              fontSize: 12
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#cccccc'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#cccccc'
              }
            }
          },
          series: {
            label: {
              show: false,
              color: '#fff',
              fontSize: 12,
              position: 'inside'
            },
            barWidth: 'auto' // 可选
          },
          colors: DEFAULT_COLORS
        },
        view: { width: 500, height: 400, x: 710, y: 340 }
      }
    ]
  }
]

export default list

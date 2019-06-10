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
        icon: 'ios-trending-up',
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
          color: DEFAULT_COLORS
        },
        view: { width: 500, height: 400, x: 710, y: 340 } // 计算中间值(1920-500)*0.5,(1080-400)*0.5
      },
      {
        title: '柱状图',
        name: 've-histogram',
        icon: 'ios-podium',
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
          color: DEFAULT_COLORS
        },
        view: { width: 500, height: 400, x: 710, y: 340 }
      },
      {
        title: '条形图',
        name: 've-bar',
        icon: 'md-list',
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
          color: DEFAULT_COLORS
        },
        view: { width: 500, height: 400, x: 710, y: 340 }
      },
      {
        title: '饼图',
        name: 've-pie',
        icon: 'ios-pie',
        api_data: {
          source: [
            { x: '1/1', y: 1393, s: '系列1' },
            { x: '1/2', y: 3530, s: '系列1' },
            { x: '1/3', y: 2923, s: '系列1' },
            { x: '1/4', y: 1723, s: '系列1' },
            { x: '1/5', y: 3792, s: '系列1' },
            { x: '1/6', y: 4593, s: '系列1' }
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
            content: '饼图',
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
            show: false,
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
              show: false,
              lineStyle: {
                color: '#cccccc'
              }
            }
          },
          yAxis: {
            show: false,
            axisLabel: {
              color: '#ffffff',
              fontSize: 12
            },
            axisLine: {
              show: false,
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
              show: true,
              color: '',
              fontSize: 12,
              position: 'outside' // 可选inside
            },
            roseType: false, // 饼图可选玫瑰图
            center: ['50%', '50%'], // 饼图可选
            radius: ['0', '70%']// 饼图可选
          },
          color: DEFAULT_COLORS
        },
        view: { width: 400, height: 400, x: 760, y: 340 }
      },
      {
        title: '雷达图',
        name: 've-radar',
        icon: 'ios-cellular',
        api_data: {
          source: [
            { x: '1/1', y: 1393, s: '指标1' },
            { x: '1/2', y: 3530, s: '指标1' },
            { x: '1/3', y: 2923, s: '指标1' },
            { x: '1/4', y: 1723, s: '指标1' },
            { x: '1/5', y: 3792, s: '指标1' },
            { x: '1/6', y: 4593, s: '指标1' },

            { x: '1/1', y: 1093, s: '指标2' },
            { x: '1/2', y: 3230, s: '指标2' },
            { x: '1/3', y: 2323, s: '指标2' },
            { x: '1/4', y: 1212, s: '指标2' },
            { x: '1/5', y: 5643, s: '指标2' },
            { x: '1/6', y: 872, s: '指标2' },

            { x: '1/1', y: 1232, s: '指标3' },
            { x: '1/2', y: 1452, s: '指标3' },
            { x: '1/3', y: 3532, s: '指标3' },
            { x: '1/4', y: 2234, s: '指标3' },
            { x: '1/5', y: 2345, s: '指标3' },
            { x: '1/6', y: 1111, s: '指标3' }
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
            content: '雷达图',
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
          radar: { // 雷达图可选
            shape: 'circle', // polygon
            center: ['50%', '60%'],
            radius: '75%'
          },
          xAxis: {
            show: false,
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
              show: false,
              lineStyle: {
                color: '#cccccc'
              }
            }
          },
          yAxis: {
            show: false,
            axisLabel: {
              color: '#ffffff',
              fontSize: 12
            },
            axisLine: {
              show: false,
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
              color: '',
              fontSize: 12,
              position: 'inside' // 可选inside
            },
            areaStyle: { // 可选的
              opacity: 0
            }
          },
          color: DEFAULT_COLORS
        },
        view: { width: 400, height: 400, x: 760, y: 340 }
      }
    ]
  }
]

export default list

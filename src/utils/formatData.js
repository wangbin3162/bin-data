// 处理图表数据源，换算为v-charts数据结构
export function formatData (source) {
  const apiData = {
    columns: [],
    rows: []
  }
  const map = new Map()

  source.forEach(item => {
    let obj = {}
    if (item.x) {
      apiData.columns[0] = 'x'
      obj['x'] = item.x
    }
    // 如果系列值存在且column中不包含这个系列则增加一个系列
    if (item.s) {
      if (!apiData.columns.includes(item.s)) {
        apiData.columns.push(item.s)
      }
      obj[item.s] = item.y
    } else {
      apiData.columns[1] = 's'
      obj['s'] = item.y
    }
    if (map.has(item.x)) {
      let temp = Object.assign(map.get(item.x), obj)
      map.set(item.x, temp)
    } else {
      map.set(item.x, obj)
    }
  })
  apiData.rows = [...map.values()]
  return apiData
}

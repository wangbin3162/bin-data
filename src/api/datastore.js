import db from '../utils/db'
import database from '../utils/database'
import { toFirst, toLast, upGo, downGo } from '../utils/arr-utils'

// 初始化所有本地数据
export function initLocalData () {
  return new Promise((resolve, reject) => {
    try {
      db.set('app', database.app).write()
      db.set('canvasMaps', database.canvasMaps).write()
      resolve({ message: '初始化数据库成功' })
    } catch (err) {
      return reject(err)
    }
  })
}

// pageSetting配置数据
export function getPageSettings () {
  return new Promise((resolve, reject) => {
    try {
      resolve({ data: db.get('app').cloneDeep().value() })
    } catch (err) {
      return reject(err)
    }
  })
}

export function setPageSettings (setting) {
  return new Promise((resolve, reject) => {
    try {
      db.set('app', setting).write()
      resolve({ data: db.get('app').cloneDeep().value() })
    } catch (err) {
      return reject(err)
    }
  })
}

export function resetPageSettings () {
  return setPageSettings(database.app)
}

// 画布db数据
export function getCanvasMaps () {
  return new Promise((resolve, reject) => {
    try {
      resolve({ data: db.get('canvasMaps').cloneDeep().value() })
    } catch (err) {
      return reject(err)
    }
  })
}

export function setBaseProperty (currentMaps) {
  return new Promise((resolve, reject) => {
    try {
      db.get('canvasMaps')
        .find({ id: currentMaps.id })
        .assign(currentMaps)
        .write()
      resolve({ data: db.get('canvasMaps').cloneDeep().value() })
    } catch (err) {
      return reject(err)
    }
  })
}

export function addCanvasMap (map) {
  return new Promise((resolve, reject) => {
    try {
      db.get('canvasMaps')
        .push(map)
        .write()
      resolve({ data: db.get('canvasMaps').cloneDeep().value() })
    } catch (err) {
      return reject(err)
    }
  })
}

export function removeCanvasMap (map) {
  return new Promise((resolve, reject) => {
    try {
      db.get('canvasMaps')
        .remove({ id: map.id })
        .write()
      resolve({ data: db.get('canvasMaps').cloneDeep().value() })
    } catch (err) {
      return reject(err)
    }
  })
}

// 置顶一个数据
export function topCanvasMap (map) {
  return new Promise((resolve, reject) => {
    try {
      let arr = db.get('canvasMaps').cloneDeep().value()
      let index = arr.findIndex(item => {
        return item.id === map.id
      })
      if (index !== arr.length - 1) {
        let newArr = toLast(arr, index)
        db.set('canvasMaps', newArr).write()
      }
      resolve({ data: db.get('canvasMaps').cloneDeep().value() })
    } catch (err) {
      return reject(err)
    }
  })
}

// 置底一个数据 即将数组元素排至开头位置
export function bottomCanvasMap (map) {
  return new Promise((resolve, reject) => {
    try {
      let arr = db.get('canvasMaps').cloneDeep().value()
      let index = arr.findIndex(item => {
        return item.id === map.id
      })
      if (index !== 0) {
        let newArr = toFirst(arr, index)
        db.set('canvasMaps', newArr).write()
      }
      resolve({ data: db.get('canvasMaps').cloneDeep().value() })
    } catch (err) {
      return reject(err)
    }
  })
}

// up
export function upCanvasMap (map) {
  return new Promise((resolve, reject) => {
    try {
      let arr = db.get('canvasMaps').cloneDeep().value()
      let index = arr.findIndex(item => {
        return item.id === map.id
      })
      if (index !== arr.length - 1) {
        let newArr = downGo(arr, index)
        db.set('canvasMaps', newArr).write()
      }
      resolve({ data: db.get('canvasMaps').cloneDeep().value() })
    } catch (err) {
      return reject(err)
    }
  })
}

// down
export function downCanvasMap (map) {
  return new Promise((resolve, reject) => {
    try {
      let arr = db.get('canvasMaps').cloneDeep().value()
      let index = arr.findIndex(item => {
        return item.id === map.id
      })
      if (index !== 0) {
        let newArr = upGo(arr, index)
        db.set('canvasMaps', newArr).write()
      }
      resolve({ data: db.get('canvasMaps').cloneDeep().value() })
    } catch (err) {
      return reject(err)
    }
  })
}

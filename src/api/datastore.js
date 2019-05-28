import db from '../utils/db'
import database from '../utils/database'

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

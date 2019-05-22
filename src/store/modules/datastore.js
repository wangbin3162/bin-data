import db from '../../utils/db'
import database from '../../utils/database'

export default {
  namespaced: true,
  actions: {
    // 获取参数配置
    get (context, { key = 'database' }) {
      return new Promise((resolve, reject) => {
        try {
          resolve({
            data: db.get(key).cloneDeep().value()
          })
        } catch (err) {
          return reject(err)
        }
      })
    },
    // 设置参数配置
    set (context, { key = 'database', value = '' }) {
      return new Promise((resolve, reject) => {
        try {
          db.set(key, value).write()
          resolve({
            data: db.get(key).cloneDeep().value()
          })
        } catch (err) {
          return reject(err)
        }
      })
    },
    // 重置数据库
    resetDataBase (context, { key = 'database' }) {
      return new Promise((resolve, reject) => {
        try {
          db.set(key, database.app).write()
          resolve({
            data: db.get(key).cloneDeep().value()
          })
        } catch (err) {
          return reject(err)
        }
      })
    }
  }
}

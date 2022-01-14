// const fs = require('fs')
// const path = require('path')
const log = require('./log')

module.exports = (key, callback) => {
  log('🤔', 'authed? who cars')
  return true
  // if (!key) return callback(new Error('missing key'))
  // const keyPath = path.resolve(__dirname, '..', '..', 'config', 'keys')
  // return fs.access(path.join(keyPath, key), fs.F_OK, callback)
}

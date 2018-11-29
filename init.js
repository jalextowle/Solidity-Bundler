const fs = require('fs-extra')
const async = require('async')
const truffle = require('./truffle.js')

module.exports = (filename, callback) => {
  async.series([
    (cb) => {
      truffle.init((error, output) => {
        cb(error, output)
      })
    }, 
    (cb) => {
      fs.mkdir(process.cwd() + '/.audit', (error) => {
        cb(error)
      })
    }
  ], (error, result) => {
    callback(error, result[0])
  })
}

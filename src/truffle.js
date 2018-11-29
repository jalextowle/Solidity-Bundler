const { exec } = require('child_process')

module.exports = {
  init: (callback) => {
    exec(__dirname + '/node_modules/.bin/truffle init', (stderr, stdout) => { 
      callback(stderr, stdout)   
    })
  }
}

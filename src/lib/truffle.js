const { exec } = require('child_process')

module.exports = {
  init: (callback) => {
    exec(getPath() + '/node_modules/.bin/truffle init', (stderr, stdout) => { 
      callback(stderr, stdout)   
    })
  }
}

function getPath() {
  let arr = __dirname.split('/')
  return arr.slice(0, arr.length - 2).join('/')
}

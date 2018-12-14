const { exec } = require('child_process')

module.exports = (tool_name, args, callback) => {
  // FIXME
  // maybe read this --> strip_file_path(__dirname, 2) + '/.evmbundle/bundle/' + tool_name + '/src'
  let path = ''
  exec(path, (stderr, stdout) => {

  })
}

function strip_file_path(dirname, strip_num) {
  let arr = dirname.split('/')
  return arr.slice(0, arr.length - strip_num).join('/')
}

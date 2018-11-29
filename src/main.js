const bundle = require('./lib/bundle.js')
const init = require('./lib/init.js')
const hooks = require('./lib/hooks.js')
const messages = require('./utils/messages.js')

function error_callback(message) {
  return (error) => {
    if (error) {
      console.log('Error: ' + message.error + error)
    } else {
      console.log(message.success)
    }
  }
}

// FIXME
function usage() {
  console.log('evmbundle: command not found')
}

switch(process.argv[2]) {
  case 'init':  
    init(process.argv[3], error_callback(messages.init))
    break
  case '+hook':
    hooks.add_hook(process.argv[3], error_callback(messages.hooks.add))
    break
  case '+src':
    bundle.add_src(process.argv[3], process.argv[4], error_callback(messages.src.add))
    break
  default: 
    usage()     
}

module.exports = {
  add_hook: (hook_type, callback) => {
    callback() 
  }, 
  run: (hook_type, callback) => {
    callback()
  }
}

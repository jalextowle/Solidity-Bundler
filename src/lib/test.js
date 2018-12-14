const bundle = require('./bundle')
bundle.is_installed('messages', exists => {
  console.log(exists)
})

module.exports = {
  init: {
    error: 'init command failed with error --',
    success: 'Initialized solbundle'
  }, 
  hooks: {
    add: {
      error: '+hook command failed with error --',
      // FIXME
      success: 'Successfully added the hook'
    }, 
  }, 
  src: {
    add: {
      error: '+src command failed with error --',
      // FIXME
      success: 'Successfully added the source file'
    }, 
  }
}

const fs = require('fs-extra')
const { exec } = require('child_process')

/* The bundle directory stucture:
 *
 * bundle/                 # Bundle directory
 *   tool_name/            # Tool directory
 *     src/                # Source files
 *     url.txt             # Github URL
 *     path.txt            # File path -- This must be filled out for both github and sourcecode links
 */

module.exports = {
  /**
   * This function will add tools to the evmbundle's bundle directory
   * @param locator: Either a github url or a filepath that specifies  
   *                 a git repository that has source code for a tool
   */
  add_src: (tool_name, locator, callback) => {
    if (locator) {
      mkdirp(bundle_directory() + tool_name, (error) => {
        if (error) {
          callback(error)
        } else if (isUrl(locator)) {
          add_src_info_github(tool_name, locator, callback)
        } else {
          add_src_info_local(tool_name, locator, callback)
        }
      })
    } else {
      callback('locator was not provided to +src')
    }
  }, 
  is_installed: (tool_name, callback) => {
    fs.exists(bundle_directory() + tool_name, exists => {
      callback(exists)
    })
  }, 
  run: (tool_name, args, callback) => {
    
  } 
}

function is_github_linked(tool_name, callback)

function isUrl(locator) {
  return locator.slice(0, 4) === 'http' 
}

function strip_file_path(dirname, strip_num) {
  let arr = dirname.split('/')
  return arr.slice(0, arr.length - strip_num).join('/')
}

function conditional_mkdir(dirname, callback) {
  fs.exists(dirname, exists => {
    if (exists) {
      callback()
    } else {
      fs.mkdir(dirname, (error) => {
        callback(error)
      })
    }
  })
}

function bundle_directory() {
  return strip_file_path(__dirname, 2) + '/.evmbundle/bundle/'
}

function mkdirp(dirname, callback) {
  let arr = dirname.split('/')
  let inner = (idx) => {
    if (idx == 0) {
      conditional_mkdir(dirname, callback)
    } else {
      conditional_mkdir(strip_file_path(dirname, idx), (error) => {
        if (error) {
          callback(error)
        } else {
          inner(idx - 1);
        }
      })
    }
  }
  inner(arr.length - 2)
}

// FIXME
function add_src_info_github(tool_name, locator, callback) {
  fs.mkdir(bundle_directory() + 
  exec('git clone ' + locator + ' ' + bundle_directory() + tool_name + '/src/', (stderr, stdout) => {
    if (stderr) {
      console.log('git error')
      callback(stderr)
    } else {
      console.log(stdout)
      callback()
    }
  })
}

function add_src_info_local(tool_name, locator, callback) {
  let path = bundle_directory() + tool_name + '/path.txt' 
  fs.exists(path, exists => {
    if (exists) {
      fs.readFile(path, (error, contents) => {
        if (error) {
          callback('failed to read ' + path + ' while generating error message for failed +src') 
        } else {
          callback(tool_name + ' is already in use as a tool name for file: ' + contents)
        }
      })
    } else {
      fs.writeFile(path, locator, (error) => {
        if (error) {
          callback(error)
        } else {
          callback()      
        }
      })
    }
  })
}

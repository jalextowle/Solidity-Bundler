const fs = require('fs')
const { exec } = require('child_process')
let sol_file = /.*\.sol$/

function describe_dir_array(dirs, idx, callback) {
  if (idx != dirs.length) {
    describe_recursive(dirs[idx], (err) => {
      if (err) {
        callback(err)
      } else {
        describe_dir_array(dirs, idx + 1, callback)
      }
    })
  } else {
    callback()
  }
}

function describe_or_push(path, items, idx, dirs, callback) {
  let original = process.cwd()
  process.chdir(path)
  if (idx < items.length) {
    if (sol_file.test(items[idx])) {
      exec('surya describe ' + items[idx], (stderr, stdout) => {
        if (stderr) {
          console.log(process.cwd())
          callback(stderr)
        } else {
          console.log(stdout)
          describe_or_push(path, items, idx + 1, dirs, callback)
        }
      })
    } else {
      fs.stat(items[idx], (err, stats) => {
        if (err) {
          callback(err)
        } else if (stats.isDirectory()) {
          dirs.push(path + '/' + items[idx])
        }
        describe_or_push(path, items, idx + 1, dirs, callback)
      })
    }
  } else {
    describe_dir_array(dirs, 0, (error) => {
      if (error) {
        callback(error)
      } else {
        process.chdir(original)
        callback()
      }
    })
  }
}

function describe_recursive(path, callback) {
  fs.readdir(path, (error, items) => {
    if (error) {
      callback(error)
    } else {
      describe_or_push(path, items, 0, [], callback) 
    }
  })
}

describe_recursive(process.cwd(), (error) => {
  if (error) {
    console.log(error)
  }
})

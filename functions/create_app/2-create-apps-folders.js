function createAppsFolders(projectName) {
  const fs = require('fs')
  const path = require('path')

  const appDir = `@/cloned-apps/${projectName}`
  const fullAppDir = path.resolve(appDir) // ensure the directory path is fully constructed

  fs.mkdir(fullAppDir, { recursive: true }, (err) => {
    if (err) {
      console.error(`Failed to create directory: ${err}`)
      return
    }

    console.log(`Directory created successfully: ${fullAppDir}`)
  })

  return 'Created app in: ' + fullAppDir
}

module.exports = createAppsFolders
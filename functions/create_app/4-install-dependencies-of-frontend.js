function installDependenciesOfFrontend (projectName) {
  const { spawn } = require('child_process')

  process.chdir(`./apps/${projectName}/frontend`)
  const installProcess = spawn('npm', ['install'])

  return new Promise((resolve, reject) => {
    installProcess.on('close', (code) => {
      console.log(`npm install exited with code ${code}`)
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`npm install exited with code ${code}`))
      }
    })
  })
}

module.exports = installDependenciesOfFrontend

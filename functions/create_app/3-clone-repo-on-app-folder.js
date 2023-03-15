function cloneRepoOnAppFolder(projectName) {
  const { exec } = require('child_process')
  const repoUrl = 'https://github.com/Manifest-AI/monorepo-starter'
  const clonePath = `./apps/${projectName}`

  return new Promise((resolve, reject) => {
    exec(`git clone ${repoUrl} ${clonePath}`, (error, stdout) => {
      if (error) {
        console.error(`Failed to clone repository: ${error}`)
        return
      }

      console.log(`Repository cloned successfully: ${stdout}`)
      resolve(stdout)
    })
  })
}

module.exports = cloneRepoOnAppFolder
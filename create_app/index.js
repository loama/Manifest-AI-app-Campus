const projectName = 'Campus'
const one_liner = 'Software for schools to manage their students, teachers, and courses.'
const functionalities_description = `
  - Manage students, teachers, and courses
  - Manage students' grades
  - Manage students' attendance
  - Upload and download files
  - Chat with students and teachers
`

async function run() {
  // const createOrganizationAndProjects = require('./1-create-organization-and-projects')
  // createOrganizationAndProjects(projectName)

  const createAppsFolders = require('./2-create-apps-folders')
  createAppsFolders(projectName)

  const cloneRepoOnAppFolder = require('./3-clone-repo-on-app-folder')
  await cloneRepoOnAppFolder(projectName)

  const installDependenciesOfFrontend = require('./4-install-dependencies-of-frontend')
  await installDependenciesOfFrontend(projectName)

  const startDevServer = require('./5-start-dev-server')
  await startDevServer(projectName)

  async function openDefaultBrowser() {
    const open = require('open');
    await open('http://localhost:3000');
  }
  await openDefaultBrowser()

  const initGitProject = require('./6-init-git-project')
  await initGitProject(projectName);
}

//run().catch((err) => {
//  console.error(err);
//})

const initGitProject = require('./6-init-git-project')
initGitProject(projectName)
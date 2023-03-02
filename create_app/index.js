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

  /* await new Promise((resolve) => {
    setTimeout(() => {
      console.log('Paused for 5 seconds');
      resolve();
    }, 5000);
  });
  
  await installDependenciesOfFrontend()
  // await startDevServer()
  async function openDefaultBrowser() {
    const open = require('open');
    //  await open('http://localhost:3000');
  }
  
  await openDefaultBrowser();
  */
  // await initGitProject();
}

run().catch((err) => {
  console.error(err);
})
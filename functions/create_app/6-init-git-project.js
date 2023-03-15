const { exec } = require('child_process');
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: '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' });

async function initGitProject(projectName) {
  process.chdir('./apps/' + projectName)

  // Initialize a new Git project in the app folder
  await new Promise((resolve, reject) => {
    console.log('initialize git project')
    exec(`git init`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Failed to initialize Git project: ${error}`);
        reject(error);
        return;
      }

      console.log(`Git project initialized successfully: ${stdout}`);
      resolve();
    });
  });

  // Create a new repository in the manifest_ai organization on GitHub
  const response = await octokit.request('POST /orgs/:org/repos', {
    org: 'manifest-ai',
    name: 'Manifest-AI-app-' + projectName,
    private: false,
  });
  const gitUrl = response.data.ssh_url;

  // const gitUrl = 'https://github.com/loama/Manifest-AI-app-Campus.git'
  console.log(`New repository created on GitHub: ${gitUrl}`);

  // Push the changes to the new repository
  await new Promise((resolve, reject) => {
    exec(`git remote rm origin && git remote add origin ${gitUrl}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Failed to add remote Git repository: ${error}`);
        reject(error);
        return;
      }

      console.log(`Remote Git repository added successfully: ${stdout}`);
      resolve();
    });
  });
}

module.exports = initGitProject
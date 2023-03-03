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

  // Add all files to the Git staging area
  await new Promise((resolve, reject) => {
    exec(`git add .`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Failed to add files to Git staging area: ${error}`);
        reject(error);
        return;
      }

      console.log(`Files added to Git staging area successfully: ${stdout}`);
      resolve();
    });
  });

  // Commit the changes with a message
  await new Promise((resolve, reject) => {
    exec(`git commit -m "start app with manifest ai"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Failed to commit changes: ${error}`);
        reject(error);
        return;
      }

      console.log(`Changes committed successfully: ${stdout}`);
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
    exec(`git remote add origin ${gitUrl}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Failed to add remote Git repository: ${error}`);
        reject(error);
        return;
      }

      console.log(`Remote Git repository added successfully: ${stdout}`);
    });
  });
}

module.exports = initGitProject
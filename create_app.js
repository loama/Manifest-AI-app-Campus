// clone repo on app folder
function cloneRepoOnAppFolder() {
  const { exec } = require('child_process')
  const repoUrl = 'https://github.com/Manifest-AI/monorepo-starter'
  const clonePath = `./apps/${projectName}`

  return new Promise((resolve, reject) => {
    exec(`git clone ${repoUrl} ${clonePath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Failed to clone repository: ${error}`)
        return
      }

      console.log(`Repository cloned successfully: ${stdout}`)
      resolve(stdout)
    })
  })
}

function installDependenciesOfFrontend() {
  const { spawn } = require('child_process');

  process.chdir(`./apps/${projectName}/frontend`)
  const installProcess = spawn('npm', ['install']);

  return new Promise((resolve, reject) => {
    installProcess.on('close', (code) => {
      console.log(`npm install exited with code ${code}`);
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`npm install exited with code ${code}`))
      }
    });
  });
}

async function startDevServer() {
  const { spawn } = require('child_process');
  process.chdir(`./`);
  const devProcess = spawn('npm', ['run', 'dev']);
  const path = require('path');

  process.chdir(path.join(__dirname, '/apps/', projectName, '/frontend'));

  return new Promise((resolve, reject) => {
    devProcess.stdout.on('data', (data) => {
      console.log(`npm run dev stdout: ${data}`);
      resolve();
    });

    devProcess.stderr.on('data', (data) => {
      console.error(`npm run dev stderr: ${data}`);
      reject(new Error(`npm run dev stderr: ${data}`));
    });

    devProcess.on('close', (code) => {
      console.log(`npm run dev exited with code ${code}`);
      if (code !== 0) {
        reject(new Error(`npm run dev exited with code ${code}`));
      }
    });
  });
}

async function initGitProject() {
  const { exec } = require('child_process');
  const { Octokit } = require("@octokit/core");
  const octokit = new Octokit({ auth: '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' });
  const path = require('path');

  process.chdir(path.join(__dirname, '/apps/', projectName))

  // Initialize a new Git project in the app folder
  await new Promise((resolve, reject) => {
    console.log('initialize git project')
    console.log(exec('pwd'))
    console.log('137')
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
  /* const response = await octokit.request('POST /user/repos', {
    name: 'Manifest-AI-app-' + projectName,
    private: false,
  });
  const gitUrl = response.data.ssh_url;
  */
  const gitUrl = 'https://github.com/loama/Manifest-AI-app-Campus.git'
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

      exec(`git branch -M main && git push -u origin main`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Failed to push changes to Git repository: ${error}`);
          reject(error);
          return;
        }

        console.log(`Changes pushed to Git repository successfully: ${stdout}`);
        resolve();
      });
    });
  });
}




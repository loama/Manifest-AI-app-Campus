async function startDevServer(projectName) {
  const { spawn } = require('child_process');
  process.chdir(`./`);
  const devProcess = spawn('npm', ['run', 'dev']);
  const path = require('path');

  // process.chdir(path.join(__dirname, '/apps/', projectName, '/frontend'));

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

module.exports = startDevServer
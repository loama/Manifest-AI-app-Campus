const simpleGit = require('simple-git');
const git = simpleGit();

async function pushToGithub(projectName) {
  try {
    await git.add('.');
    await git.commit('Commit message');
    await git.push(`https://github.com/Manifest-AI/Manifest-AI-app-${projectName}.git`, 'main');
    console.log('Changes pushed successfully!');
  } catch (error) {
    console.error('Error pushing changes:', error);
  }
}

module.exports = pushToGithub;
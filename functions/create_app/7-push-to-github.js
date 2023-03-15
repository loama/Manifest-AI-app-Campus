const simpleGit = require('simple-git');
const git = simpleGit();

async function pushToGithub(projectName) {
  console.log('abc')
  try {
    await git.add('.');
    await git.commit('Create app with Manifest AI');
    await git.push(`https://github.com/Manifest-AI/Manifest-AI-app-${projectName}.git`, 'main');
    console.log('Changes pushed successfully!');
  } catch (error) {
    console.error('Error pushing changes:', error);
  }
}

module.exports = pushToGithub;
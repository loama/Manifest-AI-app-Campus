const helpers = require('../helpers')

async function main (req, res) {
  const projectName = req.body.name
  const one_liner = req.body.details.one_liner
  const long_format = req.body.details.long_format

  /*
  const createSupabaseOrganizationAndProjects = require('../create_app/1-create-supabase-organization-and-projects')
  const supabase = await createSupabaseOrganizationAndProjects(projectName)

  const createAppsFolders = require('../create_app/2-create-apps-folders')
  const appsFolders = await createAppsFolders(projectName)

  const cloneRepoOnAppFolder = require('../create_app/3-clone-repo-on-app-folder')
  const cloneRepo = await cloneRepoOnAppFolder(projectName)

  const createDBschema = require('../create_app/5-create-db-schema')
  const schema = await createDBschema(req)

  // need to check more details, some env variables are not replaced yet
  const replaceEnvVariables = require('../create_app/4-replace-env-variables')
  const replaceEnv = await replaceEnvVariables({
    projectName,
    schema
  })

  */
  // missing creating
  const createGithubRepo = require('../create_app/create-github-repo')
  const createRepo = await createGithubRepo(projectName)

  /*
  // missing creating
  const pushToGithub = require('../create_app/push-to-github')
  const pushGithub = await pushToGithub(projectName)

  // missing creating
  const uploadToVercel = require('../create_app/upload-to-vercel')
  const uploadVercel = await uploadToVercel(projectName)
  */

  res.status(200).send({
    success: true,
    messasge: 'Created your app',
    details: {
      // supabase,
      // appsFolders
    }
  })
}

module.exports = { main }

const helpers = require('../helpers')

async function main(req, res) {
  const projectName = req.body.name
  const one_liner = req.body.details.one_liner
  const long_format = req.body.details.long_format

  // const createSupabaseOrganizationAndProjects = require('../create_app/1-create-supabase-organization-and-projects')
  // const supabase = await createSupabaseOrganizationAndProjects(projectName)

  const createAppsFolders = require('../create_app/2-create-apps-folders')
  const appsFolders = await createAppsFolders(projectName)

  res.status(200).send({
    success: true,
    messasge: 'Created your app',
    details: {
      // supabase,
      appsFolders
    }
  })
}

module.exports = { main }

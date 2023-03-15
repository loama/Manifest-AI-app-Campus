const axios = require('axios')
const { response } = require('../../server')
const supabase_token = 'sbp_3d72b5b31bd64d4756b9d7fbf0928d6e6323266f'

const supabaseAxios = axios.create({
  baseURL: 'https://api.supabase.com/v1/',
  headers: {
    Authorization: `Bearer ${supabase_token}`,
  }
})

async function createSupabaseOrganizationAndProjects(projectName) {
  const newOrganization = await supabaseAxios.post('/organizations', {
    name: projectName
  })

  console.log('created new supabase organization: ', newOrganization.data.name)
  console.log(newOrganization.data)

  let response = {
    organization: newOrganization.data,
    projects: []
  }

  const db_pass = 'sdfjNIUv893jwdvlmvfd#'
  const newProject = await supabaseAxios.post('/projects', {
    "db_pass": db_pass,
    "name": "production",
    "organization_id": newOrganization.data.id,
    "plan": "free",
    "region": "us-west-1",
    "kps_enabled": true
  })

  console.log('created new supabase production project: ', newProject.data.name)
  response.projects.push(newProject.data)

  // TODO - create staging project

  return response
}

module.exports = createSupabaseOrganizationAndProjects
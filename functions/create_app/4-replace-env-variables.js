function replaceEnvVariables (data) {
  console.log(data.schema)

  const fs = require('fs')
  const path = require('path')

  const targetFolderPath = './cloned-apps/educhat'
  const targetFiles = [
    'backend/db/schema.prisma',
    'frontend/supabase.js'
  ] // Replace with the names of the files you want to modify

  const replacements = [
    { placeholder: '{{ supabase_url }}', value: '12345' },
    { placeholder: '{{ supabase_public_key }}', value: '98765' },
    { placeholder: '{{ db_url }}', value: 'db_url9876' },
    { placeholder: '{{ prisma_schema }}', value: data.schema }
  ]

  targetFiles.forEach((fileName) => {
    const filePath = path.join(targetFolderPath, fileName)

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${fileName}:`, err)
        return
      }

      let modifiedData = data

      replacements.forEach(({ placeholder, value }) => {
        modifiedData = modifiedData.replace(new RegExp(placeholder, 'g'), value)
      })

      fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing file ${fileName}:`, err)
        } else {
          console.log(`Successfully updated ${fileName}`)
        }
      })
    })
  })
}

module.exports = replaceEnvVariables

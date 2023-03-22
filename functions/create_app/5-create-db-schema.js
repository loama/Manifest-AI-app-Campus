async function createDBschema (req) {
  const body = {
    model: 'gpt-3.5-turbo',
    max_tokens: 3000,
    temperature: 0.2,
    messages: [
      {
        role: 'user',
        content:
          'give me the tables and columns required for' +
          req.body.details.one_liner +
          "in prisma code, only code I am literally going to copy paste the response so please don't put any explanation or anything else that isn't prisma code"
      }
    ]
  }

  const axios = require('axios')
  const res = await axios({
    data: body,
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    method: 'post',
    url: 'https://api.openai.com/v1/chat/completions'
  })

  const schema = res.data.choices[0].message.content
  return schema
}

module.exports = createDBschema

// const log = require('./log')

function main(req, res, payload) {
  const response = {
    result: payload.result, // success or error
    message: payload.message, // detail about the result "order created", "user logged in"
    data: payload.data // json with the result
  }

  const status = payload.status

  // remove error from response and add it to log
  if (payload.status !== 200) {
    response.data = {}
  }

  res.status(status).send(response)
}

function index(req, res) {
  main(req, res, {
    status: 200,
    result: 'success', // success or error
    message: 'welcome to Bloom API, specify a version to get started', // detail about the result "order created", "user logged in"
    data: {}
  })
}

function indexV1(req, res) {
  main(req, res, {
    status: 200,
    result: 'success',
    message: 'welcome to Bloom API V1, specify a path to get started',
    data: {}
  })
}

function notFound(req, res) {
  main(req, res, {
    status: 404,
    result: 'error', // success or error
    message: 'route not found or incorrect HTTP method', // detail about the result "order created", "user logged in"
    data: {}
  })
}

module.exports = { index, indexV1, notFound, main }

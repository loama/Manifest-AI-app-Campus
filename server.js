'use strict'

const express = require('express')
const app = express()

const cors = require('cors')
const response = require('./functions/helpers/response')

// modules
const apps = require('./functions/apps')

app
  .use(express.json({ limit: '200mb' }))
  .use(cors())

  .all('/', (req, res) => response.index(req, res))
  .post('/v1/apps', (req, res) => apps.post(req, res))
  .all('*', (req, res) => {
    response.notFound(req, res)
  })

module.exports = app

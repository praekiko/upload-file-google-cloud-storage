import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import config from '../common/config'
import setupRoutes from './setupRoutes'

function setup() {
  const app = express()
  const { port } = config

  app.use(morgan('tiny'))
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  setupRoutes(app)

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

export default setup

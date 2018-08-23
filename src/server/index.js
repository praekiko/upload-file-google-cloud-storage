import express from 'express'

import config from '../common/config'
import setupRoutes from './setupRoutes'

function setup() {
  const app = express()
  const { port } = config

  setupRoutes(app)

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

export default setup

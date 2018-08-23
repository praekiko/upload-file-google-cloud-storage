import { Router } from 'express'
import path from 'path'
import multer from 'multer'

import { upload } from './routes'

function createRoutes() {
  const router = new Router()
  const multerMiddleware = multer({ dest: 'uploads/' })

  router.use('/upload', multerMiddleware.single('file'), upload)

  router.use('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/index.html`))
  })

  return router
}

export default app => {
  app.use('/', createRoutes())
}

import { Router } from 'express'
import path from 'path'
import multer from 'multer'

import { uploadRouter } from './routes'

function createRoutes() {
  const router = new Router()
  const multerMiddleware = multer({
    dest: path.resolve('public/photo-storage')
  })

  router.use('/upload', multerMiddleware.array('files', 12), uploadRouter)

  router.use('/', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
  })

  return router
}

export default app => {
  app.use('/', createRoutes())
}

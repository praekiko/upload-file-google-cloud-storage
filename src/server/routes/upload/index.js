import { Router } from 'express'

import config from '../../../common/config'
import GoogleStorage from '../../../common/utils/GoogleStorage'

const { bucketName } = config
const googleStorage = new GoogleStorage(bucketName)

const uploadFiles = (req, res) => {
  const { files } = req
  let promises = []

  files.forEach(file => {
    promises.push(googleStorage.uploadFileToGoogleStoragePromise(file))
  })

  Promise.all(promises)
    .then(result => {
      return res.status(200).send(result)
    })
    .catch(error => {
      return res.status(404).send(error)
    })
}

const router = new Router()

router.post('/', uploadFiles)

export default router

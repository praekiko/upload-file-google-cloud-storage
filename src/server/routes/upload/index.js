import fs from 'fs'
import Storage from '@google-cloud/storage'

import config from '../../../common/config'

const { projectId, bucketName, keyFilename } = config

const storage = Storage({
  projectId,
  keyFilename
})

const bucket = storage.bucket(bucketName)

const getPublicUrl = fileName =>
  `https://storage.googleapis.com/${bucketName}/${fileName}`

const upload = (req, res) => {
  const {
    file: { originalname, path, mimetype }
  } = req

  const bucketFile = bucket.file(originalname)

  fs.createReadStream(path)
    .pipe(
      bucketFile.createWriteStream({
        metadata: {
          contentType: mimetype
        },
        resumable: false
      })
    )
    .on('error', error => {
      file.cloudStorageError = error

      res.status(404).send({ success: false, file })
    })
    .on('finish', () => {
      bucketFile.makePublic().then(() => {
        file.cloudStoragePublicUrl = getPublicUrl(originalname)

        res.status(200).send({ success: true, file })
      })
    })
}

export default upload

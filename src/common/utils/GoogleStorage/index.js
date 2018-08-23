import Storage from '@google-cloud/storage'
import fs from 'fs'

import config from '../../config'

class GoogleStorage {
  constructor(bucketName) {
    const { projectId, keyFilename } = config

    this.storage = Storage({
      projectId,
      keyFilename
    })

    this.bucketName = bucketName
    this.bucket = this.storage.bucket(bucketName)
  }

  getPublicUrl(fileName) {
    return `https://storage.googleapis.com/${this.bucketName}/${fileName}`
  }

  uploadFileToGoogleStoragePromise(file) {
    return new Promise((resolve, reject) => {
      const { originalname, path, mimetype } = file
      const bucketFile = this.bucket.file(originalname)

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

          reject({ success: false, file })
        })
        .on('finish', () => {
          bucketFile.makePublic().then(() => {
            file.cloudStoragePublicUrl = this.getPublicUrl(originalname)

            resolve({ success: true, file })
          })
        })
    })
  }
}

export default GoogleStorage

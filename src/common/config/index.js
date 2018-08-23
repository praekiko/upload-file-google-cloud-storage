require('dotenv').config()

export default {
  port: process.env.PORT || 80,
  keyFilename: process.env.KEY_FILE_PATH,
  projectId: process.env.PROJECT_ID,
  bucketName: process.env.BUCKET_NAME
}

import aws from 'aws-sdk'
import fs from 'fs'

const s3 = new aws.S3()

export const bucketExists = (bucket: string): Promise<boolean> => 
s3
  .headBucket({ Bucket: bucket })
  .promise()
  .then(() => true)
  .catch(() => false)

export const createBucketMaybe = (bucket: string): Promise<boolean> =>
bucketExists(bucket)
  .then(exists => exists ? false : s3.createBucket({ Bucket: bucket }).promise().then(() => true))

export const uploadFile = (bucket: string, file: string): Promise<any> =>
s3
  .upload({Bucket: bucket, Key: file, Body: fs.createReadStream(file)})
  .promise()
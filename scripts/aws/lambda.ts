import aws from 'aws-sdk'
import config from '../../config'

const lambda = new aws.Lambda()

export const lambdaExists = (name: string): Promise<boolean> => 
  lambda
    .getFunction({ FunctionName: name })
    .promise()
    .then(() => true)
    .catch(() => false)


export const createOrUpdate = (name: string, bucket: string, key: string): Promise<any> =>
  lambdaExists(name)
    .then(exists => exists ?
        lambda.updateFunctionCode({
          FunctionName: name,
          S3Bucket: bucket,
          S3Key: key
        }).promise() :
        lambda.createFunction({
          FunctionName: name,
          Handler: config.handler,
          Runtime: config.runtime,
          Role: config.role,
          Code: {
            S3Bucket: bucket,
            S3Key: key
          }
        }).promise())
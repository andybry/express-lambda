import aws from 'aws-sdk'
import { Config } from '../../config'

const lambda = new aws.Lambda()

export const lambdaExists = (name: string): Promise<boolean> => 
  lambda
    .getFunction({ FunctionName: name })
    .promise()
    .then(() => true)
    .catch(() => false)


export const createOrUpdate = (config: Config): Promise<any> =>
  lambdaExists(config.lambda)
    .then(exists => exists ?
        lambda.updateFunctionCode({
          FunctionName: config.lambda,
          S3Bucket: config.bucket,
          S3Key: config.zip
        }).promise() :
        lambda.createFunction({
          FunctionName: config.lambda,
          Handler: config.handler,
          Runtime: config.runtime,
          Role: config.role,
          Code: {
            S3Bucket: config.bucket,
            S3Key: config.zip
          }
        }).promise())
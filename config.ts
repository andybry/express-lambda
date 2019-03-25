import aws from 'aws-sdk'

aws.config.region = 'eu-west-1'

const config = {
  /**
   * The AWS bucket use to store the code for the lambda
   */
  bucket: 'arb-lambda-code-bucket-2',

  /**
   * The name of the file used to store the lambda code (both locally and in S3)
   */
  zip: 'lambda.zip',

  /**
   * The name of the lambda in AWS Lambda
   */
  lambda: 'arb-lambda',

  /**
   * The name of the handler relative to the top of the zip file
   */
  handler: 'index.handler',

  /**
   * The runtime that is used in AWS Lambda to run the application
   */
  runtime: 'nodejs8.10',

  /**
   * The role (permissions) that are allocated to the running application
   */
  role: 'arn:aws:iam::935162543893:role/service-role/lambdaTesterRole'
}

export default config

export type Config = typeof config
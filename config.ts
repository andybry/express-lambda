import aws from 'aws-sdk'

aws.config.region = 'eu-west-1'

export default {
  bucket: 'arb-lambda-code-bucket-2',
  zip: 'lambda.zip',
  lambda: 'arb-lambda',
  handler: 'index.handler',
  runtime: 'nodejs8.10',
  role: 'arn:aws:iam::935162543893:role/service-role/lambdaTesterRole'
}
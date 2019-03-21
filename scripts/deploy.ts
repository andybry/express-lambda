import aws from 'aws-sdk'
import fs from 'fs';

const lambdaCodeBucket = 'arb-lambda-code-bucket-2'
const lambdaZip = 'lambda.zip'
const lambdaName = 'arb-lambda'
const lambdaHandler = 'index.handler'
const lambdaRuntime = 'nodejs8.10'
const lambdaRole = 'arn:aws:iam::935162543893:role/service-role/lambdaTesterRole'

aws.config.region = 'eu-west-1'

// S3
const s3 = new aws.S3()

const bucketExists = (bucket: string): Promise<boolean> => 
s3
  .headBucket({ Bucket: bucket })
  .promise()
  .then(() => true)
  .catch(() => false)

const createBucketMaybe = (bucket: string): Promise<boolean> =>
bucketExists(bucket)
  .then(exists => exists ? false : s3.createBucket({ Bucket: bucket }).promise().then(() => true))

const uploadFile = (bucket: string, file: string): Promise<any> =>
s3
  .upload({Bucket: bucket, Key: file, Body: fs.createReadStream(file)})
  .promise()


// LAMBDA
const lambda = new aws.Lambda()

const lambdaExists = (name: string): Promise<boolean> => 
  lambda
    .getFunction({ FunctionName: name })
    .promise()
    .then(() => true)
    .catch(() => false)


const createOrUpdate = (name: string, bucket: string, key: string): Promise<any> =>
  lambdaExists(name)
    .then(exists => exists ?
        lambda.updateFunctionCode({
          FunctionName: name,
          S3Bucket: bucket,
          S3Key: key
        }).promise() :
        lambda.createFunction({
          FunctionName: name,
          Handler: lambdaHandler,
          Runtime: lambdaRuntime,
          Role: lambdaRole,
          Code: {
            S3Bucket: bucket,
            S3Key: key
          }
        }).promise())
  

createBucketMaybe(lambdaCodeBucket)
  .then(() => uploadFile(lambdaCodeBucket, lambdaZip))
  .then(() => lambdaExists(lambdaName))
  .then(() => createOrUpdate(lambdaName, lambdaCodeBucket, lambdaZip))
  .then(console.log)
  .catch(console.log)

const elbv2 = new aws.ELBv2()
// elbv2.createLoadBalancer({
//   Name: 'arb-lb',
//   Subnets: [
//     "subnet-a5385bc3",
//     "subnet-d489fa9c",
//     "subnet-8e9538d4"
//   ],
//   SecurityGroups: [
//     "sg-090ad6cb1f8a1d397"
//   ]
// }).promise().then(console.log).catch(console.log)

// elbv2.createTargetGroup({
//   Name: 'arb-tg',
//   TargetType: 'lambda'
// }).promise().then(console.log).catch(console.log)

// lambda.addPermission({
//   FunctionName: lambdaName,
//   Principal: 'elasticloadbalancing.amazonaws.com',
//   Action: 'lambda:InvokeFunction',
//   SourceArn: 'arn:aws:elasticloadbalancing:eu-west-1:935162543893:targetgroup/arb-tg/0724ca1ab0d1f362',
//   StatementId: 'st-arb1'
// }).promise().then(console.log).catch(console.log)

// elbv2.registerTargets({
//   TargetGroupArn: 'arn:aws:elasticloadbalancing:eu-west-1:935162543893:targetgroup/arb-tg/0724ca1ab0d1f362',
//   Targets: [
//     { Id: 'arn:aws:lambda:eu-west-1:935162543893:function:arb-lambda'}
//   ]
// }).promise().then(console.log).catch(console.log)

// elbv2.createListener({
//   DefaultActions: [{
//     Type: 'forward',
//     TargetGroupArn: 'arn:aws:elasticloadbalancing:eu-west-1:935162543893:targetgroup/arb-tg/0724ca1ab0d1f362'
//   }],
//   LoadBalancerArn: 'arn:aws:elasticloadbalancing:eu-west-1:935162543893:loadbalancer/app/arb-lb/fae183c5e50d3916',
//   Port: 80,
//   Protocol: 'HTTP'
// }).promise().then(console.log).then(console.log)

const ec2 = new aws.EC2()

// ec2.createSecurityGroup({
//   Description: "arb security group", 
//   GroupName: "arb-security",
//   VpcId: "vpc-21f2c447"
//  }).promise().then(console.log).catch(console.log)

//  ec2.authorizeSecurityGroupIngress({
//    GroupName: "arb-security",
//    IpPermissions: [
//      {
//        FromPort: 80,
//        ToPort: 80,
//        IpProtocol: 'tcp',
//        IpRanges: [
//          { CidrIp: '0.0.0.0/0' }
//        ]
//      }
//    ]
//  }).promise().then(console.log).catch(console.log)
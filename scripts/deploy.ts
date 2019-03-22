import aws from 'aws-sdk'
import * as s3 from './aws/s3'
import * as lambda from './aws/lambda'
import config from '../config'

s3.createBucketMaybe(config.bucket)
  .then(() => s3.uploadFile(config.bucket, config.zip))
  .then(() => lambda.createOrUpdate(config.lambda, config.bucket, config.zip))
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
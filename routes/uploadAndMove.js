const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const {AWSCredentials, s3Bucket, sqs: {url: QueueUrl, apiVersion}} = require('../config/config');
AWS.config.update(AWSCredentials);
const s3 = new AWS.S3();
const sqs = new AWS.SQS({apiVersion});

router.post('/', async (req, res) => {
  try {
    await receiveSQSMessages();
    return res.json({result: "files moved successfully"});
  } catch (err) {
    return res.status(422).send({error: err});
  }
});

module.exports = router;

let receiveSQSMessages = async () => {
  let data = await sqs.receiveMessage({MaxNumberOfMessages: 10, QueueUrl}).promise();
  if (data.Messages && data.Messages.length) {
    await Promise.all(data.Messages.map(async (message) => {
      let paramsBucket = {
        CopySource: s3Bucket.source + '/' + message.Body,
        Bucket: s3Bucket.destination,
        Key: message.Body
      };
      let deleteParams = {QueueUrl, ReceiptHandle: message.ReceiptHandle};
      await s3.copyObject(paramsBucket).promise().catch(async (err) => {
        if (err.code !== 'NoSuchKey')
          throw new Error(err);
      });
      await sqs.deleteMessage(deleteParams).promise();
      await s3.deleteObject({Bucket: s3Bucket.source, Key: message.Body}).promise();
    }));
    await receiveSQSMessages();
  }
};
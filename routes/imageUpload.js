const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const {AWSCredentials, s3Bucket: {source, acl}, sqs: {url: QueueUrl, apiVersion}} = require('../config/config');
AWS.config.update(AWSCredentials);
const s3 = new AWS.S3();
const sqs = new AWS.SQS({apiVersion});

let upload = multer({storage: multerS3({s3, bucket: source, acl})});

let uploadFile = upload.single('image');

router.post('/', (req, res) => {
  uploadFile(req, res, async function (err) {
    if (err)
      return res.status(422).send({error: err.message});

    sqs.sendMessage({MessageBody: req.file.key, QueueUrl}, (err, data) => {
      if (err)
        return res.status(422).send({error: err.message});
      else
        return res.json({'imageUrl': req.file.location});
    });
  });
});

module.exports = router;
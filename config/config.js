exports.s3Bucket = {
  destination: 's3-destination-bucket-transfer-app',
  source: 's3-bucket-transfer-app',
  acl: 'public-read'
};

exports.AWSCredentials = {
  accessKeyId: "AKIA2J6PNC24QB3EQJMK",
  secretAccessKey: "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",
  region: "ap-south-1"
};

exports.sqs = {
  url:'https://sqs.ap-south-1.amazonaws.com/708567701177/s3-transfer-app',
  apiVersion: '2012-11-05'
};
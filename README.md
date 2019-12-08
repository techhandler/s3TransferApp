# S3 Bucket Transfer App

### 1. To run this project, install the npm modules :
```
    npm i
```

### 2. Start Node server
```
    npm start
```
    
### 3. Open postman and hit POST call to :
1. upload an image on source s3 bucket _(as shown in attachment)_
    ``http://localhost:3000/image-upload``

2. move all images to destination bucket and empty sqs
    `http://localhost:3000/uploadAndMoveFile`


##### This app is made in : 
- node : v10.13.0
- npm : 6.4.1
- os : Linux

const express = require('express');
const app = express();
const imageUploadRouter = require('./routes/imageUpload');
const uploadAndMoveRouter = require('./routes/uploadAndMove');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/image-upload', imageUploadRouter);
app.use('/uploadAndMoveFile', uploadAndMoveRouter);

module.exports = app;

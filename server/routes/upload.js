const mime = require('mime-types');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const HttpError = require('../middleware/error');
const csvDir = './server/uploads';
let uploadFileName = null;

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, photoDir);
    },
    filename: (req, file, callback) => {
      uploadFileName = file.originalname.replace(/\.[^.]+$/, "") + '-' + Date.now() + '.' + mime.extension(file.mimetype);
      callback(null, uploadFileName);
    }
});

const upload = multer({ 
  storage : storage,
  fileFilter: (req, file, callback) => {
    const ext = mime.extension(file.mimetype);
    console.log(ext);
    if(ext !== '.csv') {
      return callback(new Error('Only csv are allowed'))
    }
    callback(null, true)
  },
  limits:{
      fileSize: 1024 * 1024
  }
}).single('file');



module.exports = (req, res, next) => {
  console.log('--- ', req.url);
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return next(new HttpError(500, 'error loading file'));
    }
    res.json({status: 200,  message: 'File has uploaded' });
  });
};
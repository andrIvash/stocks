// file upload middleware
const mime = require('mime-types');
const multer = require('multer');
const config = require('../config');

const HttpError = require('./error');
const winston = require('./winston');

const csvDir = config().get('csvDir');
let uploadFileName = null;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
      callback(null, csvDir);
  },
  filename: (req, file, callback) => {
    uploadFileName = file.originalname.replace(/\.[^.]+$/, "") + '-' +
      Date.now() + '.' + mime.extension(file.mimetype);
    callback(null, uploadFileName);
  }
});

const upload = multer({ 
  storage : storage,
  fileFilter: (req, file, callback) => {
    const ext = mime.extension(file.mimetype);
    winston.info('load file')
    if(ext !== 'csv') {
      return callback(new HttpError('Only csv are allowed', 400))
    }
    callback(null, true)
  },
  limits:{
      fileSize: 64 * 64 //1024 * 1024
  }
}).single('file');

module.exports = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      err = err.status ? err : new HttpError(err.message, 500);
      return next(err);
    }
    res.locals = { uploadFileName };
    next()
  });
};
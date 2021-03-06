// file transform middleware ( from csv to json)

const path = require('path');
const csv = require('csvtojson');
const config = require('../config');

const HttpError = require('./error');
const csvDir = config().get('csvDir');
const winston = require('./winston');

module.exports = (req, res, next) => {
  const { uploadFileName } =  res.locals;
  winston.info('transform file');
  csv()
  .on('error',(err) => {
    return next(new HttpError(`There has been a problem with file transformation: ${err.message}`, 500));
  })
  .fromFile(path.join(csvDir, uploadFileName))
  .then( jsonObj => {
    jsonObj.length > 0 ?
      res.json({status: 200,  message: 'File has uploaded', data: jsonObj }) :
      next(new HttpError(`There has been a problem with file transformation`, 500));
  })
};
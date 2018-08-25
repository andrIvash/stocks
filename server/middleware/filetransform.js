const path = require('path');
const csv = require('csvtojson');

const HttpError = require('../middleware/error');
const csvDir = './server/uploads';

module.exports = (req, res, next) => {
  const { uploadFileName } =  res.locals;
  csv()
  .on('error',(err)=>{
    return next(new HttpError(`
      There has been a problem with file transformation: ${err.message}`, 500));
  })
  .fromFile(path.join(csvDir, uploadFileName))
  .then( jsonObj => {
    console.log('finish')
    res.json({status: 200,  message: 'File has uploaded', data: jsonObj });
  })
};
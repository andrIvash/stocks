const HttpError = require('../middleware/error');
const express = require('express');
const router = express.Router();

module.exports = (app) => {
  app.use('/api/v1.0', router);

  router.get('/upload', require('./upload'));  
  
  router.get('/', (req, res) => {
    throw new HttpError('api ok, please choose a proper request', 400);
  });
};

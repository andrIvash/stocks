const HttpError = require('../middleware/error');
const express = require('express');
const router = express.Router();

module.exports = (app) => {
  app.use('/api/v1.0', router);

  router.post('/upload', 
    require('../middleware/upload'),
    require('../middleware/filetransform'));  
  
  router.get('/', (req, res) => {
    throw new HttpError('api ok, please choose a proper request', 400);
  });
};

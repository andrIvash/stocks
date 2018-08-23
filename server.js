// main file
const express = require('express');
const path = require('path');
const HttpError = require('./server/middleware/error');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// add routes
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  //res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
require('./server/routes')(app);

app.use('*', (req, res) => {
  throw new HttpError('Not found. API is on http://localhost:3005/api/v1.0', 404);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({status: err.status, message: err.message});
});

app.listen(3005, () => console.log('Example app listening on port 3005!'));

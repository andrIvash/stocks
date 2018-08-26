// main server
const express = require('express');
const HttpError = require('./server/middleware/error');
const config = require('./server/config');

const app = express();

// Logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// add routes
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', config().get('frontAccess'));
  //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  //res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
require('./server/routes')(app);

// default route
app.use('*', (req, res) => {
  throw new HttpError(`Not found. API is on ${config().get('apiAddress')}/api/v1.0`, 404);
});

// default error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({status: err.status, message: err.message});
});

// server start
app.listen(config().get('port'),
  () => console.log(`Example app listening on port ${config().get('port')}!`));

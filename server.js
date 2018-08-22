// main file
const express = require('express');
const path = require('path');
const HttpError = require('./server/middleware/error');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// add routes
require('./server/routes')(app);

app.use('*', (req, res) => {
  throw new HttpError('Not found. API is on http://localhost:3000/api/v1.0', 404);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({status: err.status, message: err.message});
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

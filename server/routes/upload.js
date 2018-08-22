const HttpError = require('../middleware/error');

module.exports = (req, res) => {
  console.log('--- ', req.url);
  throw new HttpError('upload', 200);
};
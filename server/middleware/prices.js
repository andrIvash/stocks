const HttpError = require('./error');
const winston = require('./winston');
const { models, sequelize } = require('./postgres');

module.exports = (req, res, next) => {
  // sequelize
  //   .query(
  //     'SELECT * FROM prices.towns'
  //   )
  //   .then(prices => {
  //     res.json({status: 200, data: prices[0] });
  //   })
  //   .catch(err => {
  //     return next(new HttpError(err, 422));
  //   }).catch((err) => {
  //     return next(new HttpError('issues trying to connect to database', 400));
  //   })
   models.Town.findAll()
   .then(towns => {
      res.json({status: 200,  data: towns });
   }).catch(err => {
     return next(new HttpError('Bad request', 400));
   })
};

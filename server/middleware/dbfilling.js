//db filling

const HttpError = require('./error');
const winston = require('./winston');
const { Town, sequelize } = require('./postgres');

module.exports = (req, res, next) => {
  Town.sync().success(() => {
    console.log('----- success');
  }).error(error => {
    console.log('- error \n', error);
  })
  Town.sync()
    .then(() => {
      winston.info('Adding initial data to DB');
      return Town.create({
        city: 'Kiev',
        temp_lo: 21,
        temp_hi: 34,
        date: Date.now()
      });
    })
    .catch(err => {
      winston.error(`Adding data error - ${err}`);
    });
  //  Town.findAll()
  //  .then(towns => {
  //     res.json({status: 200,  data: towns });
  //  }).catch(err => {
  //    return next(new HttpError('Bad request', 400));
  //  })
};

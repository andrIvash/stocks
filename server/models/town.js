module.exports = (sequelize, type) => {
  return sequelize.define('town', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      city: type.STRING,
      temp_lo: type.INTEGER,
      temp_hi: type.INTEGER,
      date: type.DATE
    }, {
      schema: 'prices'
  })
}
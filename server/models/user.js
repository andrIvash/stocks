module.exports = (sequelize, type) => {
  return sequelize.define('users', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      login: type.STRING,
      email: {
        type: type.INTEGER 
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },
      full_name: type.INTEGER,
      date: {
        type: type.DATE,
        validate: {
          isDate: true,
        },
        defaultValue: type.NOW
      },
      set_id: type.INTEGER
    }, {
      schema: 'fr_user'
  })
}
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
    Location.belongsToMany(models.User, {through: 'Favorites', foreignKey: 'userId', as: 'users'})
  };
  return Location;
};

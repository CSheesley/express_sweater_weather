'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    LocationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Locations',
        key: 'id'
      }
    }
  }, {});
  Favorite.associate = function(models) {
    // associations can be defined here
    Favorite.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
    Favorite.belongsTo(models.Location, {foreignKey: 'locationId', as: 'location'})
  };
  return Favorite;
};

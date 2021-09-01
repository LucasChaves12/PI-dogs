const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
 sequelize.define('breedTemperament', {
     id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true
     },
     breedId: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false
    },
     temperamentId: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false
    }
 })
}
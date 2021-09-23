const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

sequelize.define('temperament', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},{ timestamps:false})
}
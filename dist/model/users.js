"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function userModel(sequelize) {
    const User = sequelize.define("User", {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        phone_number: {
            type: sequelize_1.DataTypes.INTEGER
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'users'
    });
    return User;
}
exports.default = userModel;

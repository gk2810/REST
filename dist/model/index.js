"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const users_1 = __importDefault(require("./users"));
exports.sequelize = new sequelize_1.Sequelize('ts', "root", "root", {
    host: "localhost",
    dialect: "mysql"
});
exports.sequelize.authenticate().then(() => {
    console.info("Connection has been established successfully.");
}).catch((err) => {
    console.error("Unable to connect to the database:", err);
});
const db = {
    User: (0, users_1.default)(exports.sequelize),
    sequelize: exports.sequelize,
    Sequelize: sequelize_1.Sequelize
};
exports.sequelize.sync();
exports.default = db;

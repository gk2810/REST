import { Sequelize, DataType } from "sequelize";
import User from "./users"
import { errorHandler } from "../errorHandler/errorHandler";

export let sequelize = new Sequelize('ts', "root", "root", {
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate().then(() => {
    console.info("Connection has been established successfully.");
})

const db = {
    User: User(sequelize),
    sequelize: sequelize,
    Sequelize: Sequelize
};

sequelize.sync();
export default db;
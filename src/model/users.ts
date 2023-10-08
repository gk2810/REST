import { Model, CreationOptional, InferAttributes, InferCreationAttributes, Optional, ModelDefined, Sequelize, DataTypes } from 'sequelize';


export default function userModel(sequelize: Sequelize) {
    interface UserAttributes {
        id: number,
        name: string,
        email: string,
        phone_number: number,
        password: string
    }

    type UsercreationAttributes = Optional<UserAttributes, "phone_number">

    const User: ModelDefined<UserAttributes, UsercreationAttributes> = sequelize.define(
        "User", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.INTEGER
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            tableName: 'users'
        }
    )
    return User
}
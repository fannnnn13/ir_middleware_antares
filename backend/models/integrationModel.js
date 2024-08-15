import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Remote from "./remoteModel.js";

const { DataTypes } = Sequelize;

const Integration = db.define(
    "integration",
    {
        uuid: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        integration_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        access_key: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        antares_app_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        antares_device_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        device_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Remote,
                key: "id",
            },
            validate: {
                notEmpty: true,
            },
            onDelete: "CASCADE",
        },
    },
    {
        freezeTableName: true,
    }
);

Remote.hasOne(Integration, { foreignKey: "device_id" });
Integration.belongsTo(Remote, { foreignKey: "device_id" });

export default Integration;

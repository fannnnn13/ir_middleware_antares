import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Brands from "./brandModel.js";

const { DataTypes } = Sequelize;

const VariantIR = db.define(
    "variant_ir",
    {
        uuid: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        brand_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Brands,
                key: "id",
            },
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        variant_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        raw_data1: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        raw_data2: {
            type: DataTypes.TEXT,
        },
    },
    {
        freezeTableName: true,
    }
);

Brands.hasMany(VariantIR, { foreignKey: "brand_id" });
VariantIR.belongsTo(Brands, { foreignKey: "brand_id" });

export default VariantIR;

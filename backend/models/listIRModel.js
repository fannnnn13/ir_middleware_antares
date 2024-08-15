import { Sequelize } from "sequelize";
import db from "../config/database.js";
import VariantIR from "./variantIRModel.js";
import Remote from "./remoteModel.js";
import Brands from "./brandModel.js";

const { DataTypes } = Sequelize;

const ListIR = db.define(
    "list_ir",
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
        variant_id: {
            type: DataTypes.INTEGER,
            references: {
                model: VariantIR,
                key: "id",
            },
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        device_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Remote,
                key: "id",
            },
            allowNull: false,
            validate: {
                notEmpty: true,
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    },
    {
        freezeTableName: true,
    }
);

// Relational
Remote.hasMany(ListIR, { foreignKey: "device_id" });
ListIR.belongsTo(Remote, { foreignKey: "device_id" });

VariantIR.hasMany(ListIR, { foreignKey: "variant_id" });
ListIR.belongsTo(VariantIR, { foreignKey: "variant_id" });

Brands.hasMany(ListIR, { foreignKey: "brand_id" });
ListIR.belongsTo(Brands, { foreignKey: "brand_id" });

export default ListIR;

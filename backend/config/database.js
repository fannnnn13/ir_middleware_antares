import { Sequelize } from "sequelize";

const db = new Sequelize("antares_ir_database", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

export default db;

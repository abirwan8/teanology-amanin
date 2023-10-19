import {Sequelize} from "sequelize";

const db = new Sequelize('teanology3_db', 'root', '', {
  host: "localhost",
  dialect: "mysql"
});

export default db;
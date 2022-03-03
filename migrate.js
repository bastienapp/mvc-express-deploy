require("dotenv").config();

const fs = require("fs");
const mysql = require("mysql2");

const migrate = () => {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true,
  });

  const sql = `${
    `DROP DATABASE IF EXISTS \`${DB_NAME}\`;\n` +
    `CREATE DATABASE \`${DB_NAME}\`;\n` +
    `USE \`${DB_NAME}\`;\n`
  }${fs.readFileSync("./database.sql", "utf8")}`;

  connection.query(sql, (err) => {
    console.log(err || "Migration success");
    connection.end();
  });
};

try {
  migrate();
} catch (err) {
  console.log(err);
}

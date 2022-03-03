require("dotenv").config();

const fs = require("fs");
const mysql = require("mysql2");

const migrate = () => {
  const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  const connection = mysql.createConnection({
    host: "localhost",
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true,
  });

  const sql = `${
    `drop database if exists ${DB_NAME};\n` +
    `create database ${DB_NAME};\n` +
    `use ${DB_NAME};\n`
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

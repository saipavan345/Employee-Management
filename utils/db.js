import mysql from "mysql2";

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "system@123",
  database: "employeems",
});
conn.connect((err) => {
  if (err) return console.log("Error" + err);
  else return console.log("success connection");
});

export default conn;

import express from "express";
import conn from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const employeeRouter = express.Router();

employeeRouter.post("/employee_login", (req, res) => {
  const sql = "SELECT * FROM employee WHERE email=?";
  conn.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        if (err) return res.json({ Status: false, Error: "Wrong Password" });
        if (response) {
          const email = result[0].email;
          const token = jwt.sign(
            { role: "employee", email: email ,id:result[0].id},
            "jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.json({ Status: true, id: result[0].id });
        } else
          return res.json({ Status: false, Error: "Wrong Email & Password" });
      });
    } else return res.json({ Status: false, Error: "Wrong Email & Password" });
  });
});

employeeRouter.get("/detail/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id=?";
  conn.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });

    return res.json(result);
  });
});

employeeRouter.get('/logout',(req,res)=>{
  res.clearCookie('token')
  return res.json({Status:true})
})

export { employeeRouter as emprouter };

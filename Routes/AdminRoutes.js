

import express from "express";
import conn from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const adminRouter = express.Router();

adminRouter.post("/adminlogin", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM admins WHERE email = ? AND password = ?";

  conn.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({
        loginStatus: false,
        Error: "Database error...",
      });
    }

    if (result.length > 0) {
      const token = jwt.sign({ role: "admin", email:email,id:result[0].id}, "jwt-secret-key", {
        expiresIn: "1d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      });

      return res.json({
        loginStatus: true,
        message: "sucess",
      });
    } else {
      return res.status(401).json({
        loginStatus: false,
        Error: "Wrong credentials...",
      });
    }
  });
});

adminRouter.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  conn.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Wrong" });
    else return res.json({ Status: true, Result: result });
  });
});

adminRouter.post("/add_category", (req, res) => {
  const { category } = req.body;
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  conn.query(sql, [category], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    else return res.json({ Status: true });
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images"); //Foldername
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

adminRouter.post("/add_employee", upload.single("image"), (req, res) => {
  const sql =
    "INSERT INTO employee (name,email,password,salary,address,category_id,image) VALUES (?)";

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.json({ Status: false, Error: "Password hash error" });
    }

    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.salary,
      req.body.address,
      req.body.category_id,
      // req.body.image,
      req.file.filename,
    ];

    conn.query(sql, [values], (err, result) => {
      if (err) {
        return res.json({ Status: false, Error: err });
      }
      return res.json({ Status: true, Result: result });
    });
  });
});

adminRouter.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee";
  conn.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Wrong" });
    else return res.json({ Status: true, Result: result });
  });
});

adminRouter.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id=?";
  conn.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Wrong" });
    else return res.json({ Status: true, Result: result });
  });
});

adminRouter.put("/edit_employee/:id", (req, res) => {
  const values = [
    req.body.name,
    req.body.email,
    req.body.salary,
    req.body.address,
  ];
  const id = req.params.id;
  const sql = `UPDATE employee SET name=?, email=?, salary=?, address=? WHERE id=?`;
  conn.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Wrong" });
    else return res.json({ Status: true, Result: result });
  });
});

adminRouter.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM employee WHERE id=?`;
  conn.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    else
      return res.json({
        Status: true,
        Result: result,
        message: "DELETED RECORD.",
      });
  });
});

adminRouter.get("/count", (req, res) => {
  const sql1 = `SELECT COUNT(*) AS employeeCount FROM employee`;
  const sql2 = `SELECT IFNULL(SUM(salary), 0) AS totalSalary FROM employee`;
  const sql3 = `SELECT COUNT(*) AS adminCount FROM admin`;

  conn.query(sql1, (err, result1) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });

    conn.query(sql2, (err, result2) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });

      conn.query(sql3, (err, result3) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        //[0] is used because the database result is an array, and [0] means “first row”.
        return res.json({
          Status: true,
          Result: {
            employeeCount: result1[0].employeeCount,
            totalSalary: result2[0].totalSalary,
            adminCount: result3[0].adminCount,
          },
        });
      });
    });
  });
});

adminRouter.get("/admin_list", (req, res) => {
  const sql = "SELECT * FROM admin";
  conn.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Wrong" });
    else return res.json({ Status: true, Result: result });
  });
});

adminRouter.get("/logout_page", (req, res) => {
  res.clearCookie("token");
  return res.json({
    Status: true,
    message: "Logout success and cookie remove from browser",
  });
});

export default adminRouter;

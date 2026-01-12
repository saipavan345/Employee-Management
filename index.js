import express from "express";
import cors from "cors";
import adminRouter from "./Routes/AdminRoutes.js";
import { emprouter } from "./Routes/EmployeeRoutes.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";


const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", adminRouter);
app.use("/employee", emprouter);
app.use(cookieParser());
app.use(express.static("Public"));

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log('sss',token);
  if (token) {
    jwt.verify(token, "jwt_secret_key", (err, decode) => {
      if (err) return res.json({ Status: false, Error: "Token Error" });
      req.id = decode.id;
      req.role = decode.role;
      next();
    });
  } else res.json({ Status: false, Error: "Not Authenticated" });
};

app.get("/verify", verifyUser, (req, res) => {
  return res.json({Status:true,role:req.role,id:req.id})
});

//allows your Express server to read JSON data sent from the client.
// What express.json() does internally

// Reads incoming request body
// Parses JSON data
// Converts it into a JavaScript object
// Attaches it to req.body
app.listen(3000, () => {
  console.log("Server is running at port 3000");
});

import axios from "axios";
import React, { use } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/verify")
      .then((result) => {
        if (result.data.Status) {
          if (result.data.role === "admin") navigate("/dashboard");
          else navigate("/employee_detail/" + result.data.id);
        } else navigate("/");
      })

      .catch((err) => {
        console.log("err:", err);
      });
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 boarder loginForm">
        <h2 className="text-center">Login Page</h2>
        <div className="d-flex justify-content-between mt-5 mb-2">
          <button
            className="btn btn-success"
            onClick={() => {
              navigate("/employee_login");
            }}
          >
            Employee
          </button>
          <button
            className="btn btn-info"
            onClick={() => {
              navigate("/adminlogin");
            }}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;

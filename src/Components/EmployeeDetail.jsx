import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

//useParams() is used to read dynamic route parameters from the URL in React Router.
const EmployeeDetail = () => {
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/employee/detail/" + id)
      .then((result) => {
        console.log(result.data[0]);
        setEmployee(result.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/employee/logout")
      .then((result) => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          return navigate("/");
        }
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  return (
    <div>
      <div className="p-5  text-center shadow">
        <div>
          <h2 className="fw-bold text-center mb-4">
         
            Employee Management System
          </h2>
        </div>

        <div className="d-flex text-center flex-column align-items-center mt-3">
          <img
            src={"http://localhost:3000/Images/" + employee.image}
            className="img-fluid w-25 rounded-circle"
          />
          <div className="d-flex align-items-center flex-column mt-5">
            <h3>Name : {employee.name}</h3>
            <h3>Email : {employee.email}</h3>
            <h3>Salary : {employee.salary}</h3>
          </div>
          <div className="mt-2">
            <button className="btn btn-warning me-3">Edit</button>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;

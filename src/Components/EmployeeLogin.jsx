import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const EmployeeLogin = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/employee/employee_login", values)
      // .then(result=>console.log("ans",result))
      .then((result) => {
        console.log("res:", result.data.id);
        if (result.data.Status) {
          localStorage.setItem("view", true);
          navigate("/employee_detail/" + result.data.id);
        } else setError(result.data.Error);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 boarder loginForm">
        <h2>Login Page</h2>
        <div className="text-danger">{error && error}</div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter EmailID"
              className="form-control rounded-0"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            ></input>
          </div>

          <div className="mb-4">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Enter Password"
              className="form-control rounded-0"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            ></input>
          </div>
          <button className="btn btn-success w-100 rounded-0">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLogin;

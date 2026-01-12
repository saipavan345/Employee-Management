import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) setCategory(result.data.Result);
        else alert(result.data.Error);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3000/auth/employee/" + id)
      .then((result) => {
        setEmployee({
          ...employee,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          salary: result.data.Result[0].salary,
          address: result.data.Result[0].address,
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  // useState stores the value, onChange updates the value, and value displays the value.

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/auth/edit_employee/" + id, employee)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else alert(result.data.Error);
      })
      .catch((err) => {
        console.log("errs", err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-75">
      <div className="p-3 rounded w-25 boarder">
        <h2>Edit Employee</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="category">
              <strong>Name:</strong>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="form-control rounded-0"
              value={employee.name}
              onChange={(e) => {
                setEmployee({ ...employee, name: e.target.value });
              }}
            ></input>
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter EmailID"
              value={employee.email}
              className="form-control rounded-0"
              onChange={(e) => {
                setEmployee({ ...employee, email: e.target.value });
              }}
            ></input>
          </div>

          <div className="mb-4">
            <input
              type="number"
              name="salary"
              autoComplete="off"
              step="0.01"
              placeholder="Enter Salary"
              value={employee.salary}
              className="form-control rounded-0"
              onChange={(e) => {
                setEmployee({ ...employee, salary: e.target.value });
              }}
            ></input>
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="address"
              autoComplete="off"
              placeholder="Enter Address"
              value={employee.address}
              className="form-control rounded-0"
              onChange={(e) => {
                setEmployee({ ...employee, address: e.target.value });
              }}
            ></input>
          </div>

          <button className="btn btn-success w-100 rounded-0">
            Edit Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;

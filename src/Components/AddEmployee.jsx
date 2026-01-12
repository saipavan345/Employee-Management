import React, { useEffect, useState } from "react";
import { Category } from "./Category";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AddEmployee = () => {
  const [category, setCategory] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: "",
    image: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) setCategory(result.data.Result);
        else alert(result.data.Error);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    //  We use FormData to send files along with form data because normal JSON requests cannot carry binary file data.
    //FormData is used to send both normal data and files together using multipart/form-data.
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("password", employee.password);
    formData.append("salary", employee.salary);
    formData.append("address", employee.address);
    formData.append("category_id", employee.category_id);
    formData.append("image", employee.image);
    axios
      .post("http://localhost:3000/auth/add_employee", formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else alert(result.data.Error);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-75">
      <div className="p-3 rounded w-25 boarder">
        <h2>Add Employee</h2>

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
              className="form-control rounded-0"
              onChange={(e) => {
                setEmployee({ ...employee, email: e.target.value });
              }}
            ></input>
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Enter Password"
              className="form-control rounded-0"
              onChange={(e) => {
                setEmployee({ ...employee, password: e.target.value });
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
              className="form-control rounded-0"
              onChange={(e) => {
                setEmployee({ ...employee, address: e.target.value });
              }}
            ></input>
          </div>

          <div className="mb-4">
            <select
              name="category"
              id="category"
              className="form-select"
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }
            >
              <option value="">Select Category</option>

              {category.map((ans) => (
                <option key={ans.id} value={ans.id}>
                  {ans.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <input
              type="file"
              className="form-control rounded-0"
              name="image"
              onChange={(e) => {
                setEmployee({ ...employee, image: e.target.files[0] });
              }}
            ></input>
          </div>

          <button className="btn btn-success w-100 rounded-0">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;

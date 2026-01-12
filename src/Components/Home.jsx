import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const [admin, setAdmin] = useState(0);
  const [employee, setEmployee] = useState(0);
  const [salary, setSalary] = useState(0);
  const [adminlist, setadminList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/count")
      .then((result) => {
        setSalary(result.data.Result.totalSalary);
        setEmployee(result.data.Result.employeeCount);
        setAdmin(result.data.Result.adminCount);
        console.log("counts:", result.data.Result);
      })
      .catch((err) => {
        console.log("err", err);
      });

    axios
      .get("http://localhost:3000/auth/admin_list")
      .then((result) => {
        setadminList(result.data.Result);
        console.log(result.data.Result);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  return (
    <div className="d-flex justify-content-between m-5">
      <div className="card m-3" style={{ width: "18rem", height: "120px" }}>
        {/* <img src="" className="card-img-top" alt="..." /> */}
        <div className="card-body">
          <h5 className="card-title">Admin</h5>
          <p className="card-text">Admin Count : {admin}</p>
        </div>
      </div>

      <div className="card m-3" style={{ width: "18rem", height: "120px" }}>
        {/* <img src="" className="card-img-top" alt="..." /> */}
        <div className="card-body">
          <h5 className="card-title">Employee</h5>
          <p className="card-text">Employee Count : {employee}</p>
        </div>
      </div>

      <div className="card m-3" style={{ width: "18rem", height: "120px" }}>
        {/* <img src="" className="card-img-top" alt="..." /> */}
        <div className="card-body">
          <h5 className="card-title">Salary</h5>
          <p className="card-text">Salary Count : {salary}</p>
        </div>
      </div>

      <div>
        <table border="1" cellPadding={15} className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {adminlist.map((ans) => {
              return (
                <tr key={ans.id}>
                  <td>{ans.id}</td>
                  <td>{ans.email}</td>
                  <button className="btn btn-warning me-3">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;

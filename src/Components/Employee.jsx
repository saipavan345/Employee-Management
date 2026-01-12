import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const Employee = () => {
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) setEmployee(result.data.Result);
        else alert(result.data.Error);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteRecord = (id) => {
    axios
      .delete("http://localhost:3000/auth/delete_employee/" + id)
      .then((result) => {
        // console.log("d", result);
        if (result.data.Status) window.location.reload();
        else alert(result.data.Error);
      })
      .catch((err) => {
        "errors", err;
      });
  };

  return (
    <div className="px-5 mt-5">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>

      <div>
        <table border="5" cellPadding="15" className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Salary</th>
              <th>Address</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((ans) => {
              return (
                <tr key={ans.id}>
                  <td>{ans.id}</td>
                  <td>{ans.name}</td>
                  <td>{ans.email}</td>
                  <td>{ans.password}</td>
                  <td>{ans.salary}</td>
                  <td>{ans.address}</td>
                  <td>
                    <img
                      src={`http://localhost:3000/Images/${ans.image}`}
                      width="50"
                    />
                  </td>
                  <td className="d-flex gap-2">
                    <Link
                      to={`/dashboard/edit_employee/` + ans.id}
                      className="btn btn-warning"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteRecord(ans.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3"></div>
    </div>
  );
};

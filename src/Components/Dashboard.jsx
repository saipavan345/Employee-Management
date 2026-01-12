import axios from "axios";
import React from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios
      .get("http://localhost:3000/auth/logout_page")
      .then((result) => {
        if (result.data.Status) {
          localStorage.removeItem('valid');
          navigate("/");
        }
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <Link to="/dashboard">CWC</Link>
            <ul className="l">
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/dashboard/employee">Manage Employee</Link>
              </li>
              <li>
                <Link to="/dashboard/category">Category</Link>
              </li>
              <li>
                <Link to="/dashboard/profile">Profile</Link>
              </li>
              <li onClick={handleLogout}>
                <Link to="/dashboard/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col m-0 p-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h2> Employee</h2>
          </div>
          <Outlet />
          {/* Child page loads here->used to render child routes inside a parent route in React Router */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

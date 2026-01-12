import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./Components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import { Category } from "./Components/Category";
import Profile from "./Components/Profile";
import { Employee } from "./Components/Employee";
import AddCategory from "./Components/AddCategory";
import AddEmployee from "./Components/AddEmployee";
import EditEmployee from "./Components/EditEmployee";
import Home from "./Components/Home";
import Start from "./Components/Start";
import EmployeeLogin from "./Components/EmployeeLogin";
import EmployeeDetail from "./Components/EmployeeDetail";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Start />} />
          <Route path="/adminlogin" element={<Login />} />
          <Route path="/employee_login" element={<EmployeeLogin />} />
          <Route
            path="/employee_detail/:id"
            element={<EmployeeDetail />}
          ></Route>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="" element={<Home />}></Route>
            <Route path="/dashboard/employee" element={<Employee />}></Route>
            <Route path="/dashboard/category" element={<Category />}></Route>
            <Route path="/dashboard/profile" element={<Profile />}></Route>
            <Route
              path="/dashboard/add_category"
              element={<AddCategory />}
            ></Route>
            <Route
              path="/dashboard/add_employee"
              element={<AddEmployee />}
            ></Route>
            <Route path="/dashboard/logout" element={<Dashboard />}></Route>
            <Route
              path="/dashboard/edit_employee/:id"
              element={<EditEmployee />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

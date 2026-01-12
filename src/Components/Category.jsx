import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Category = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) setCategory(result.data.Result);
        else alert(result.data.Error);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="px-5 mt-5">
      <div className="d-flex justify-content-center">
        <h3>Category</h3>
      </div>
      <Link to="/dashboard/add_category" className="btn btn-success">
        Add Category
      </Link>
      <div className='mt-3'>
        <table border="1" cellPadding='10' className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {category.map((ans) => {
              return (
                <tr key={ans.id}>
                  <td>{ans.id}</td>
                  <td>{ans.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

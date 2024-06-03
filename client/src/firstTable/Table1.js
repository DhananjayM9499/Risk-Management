import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {} from "react-toastify";
import axios from "axios";
import "./Home.css";
import Footer from "../pages/footer";
import Header from "../pages/header";
import * as API from "../endpoint";

const Table1 = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get(API.GET_OBJECTTYPE_API);
    setData(response.data);
  };
  useEffect(() => {
    loadData();
  }, []);

  const deleteobject = (objectid) => {
    if (window.confirm("Are you sure you want to delete")) {
      axios.delete(API.DELETE_OBJECTTYPE_API);
      console.log("success:", "deleted successfully");
      setTimeout(() => loadData(), 500);
    }
  };
  return (
    <div>
      <Header />
      <div style={{ marginTop: "150px" }}>
        <Link to="/addobject">
          <center>
            {" "}
            <button className="btn btn-contact">Add Object Type</button>
          </center>
        </Link>

        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No</th>
              <th style={{ textAlign: "center" }}>Object Type</th>
              <th style={{ textAlign: "center" }}>Object Type Description</th>
              <th style={{ textAlign: "center" }}>Icon Upload</th>
              <th style={{ textAlign: "center" }}>file Upload</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.objecttype}</td>
                  <td>{item.objecttypedescription}</td>
                  <td>{item.iconupload}</td>
                  <td>{item.fileupload}</td>
                  <td>
                    <Link to={`/update/${item.objectid}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteobject(item.objectid)}
                    >
                      Delete
                    </button>
                    <Link to={`/view/${item.objectid}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Table1;

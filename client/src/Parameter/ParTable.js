import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {} from "react-toastify";
import axios from "axios";
import Footer from "../pages/footer";
import Header from "../pages/header";
import * as API from "../endpoint";

const ParTable = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get(API.GET_PARAMETER_API);
    setData(response.data);
  };
  useEffect(() => {
    loadData();
  }, []);

  const deleteobject = (parameterid) => {
    if (window.confirm("Are you sure you want to delete")) {
      axios.delete(API.DELETE_PARAMETER_API(parameterid));
      console.log("success:", "deleted successfully");
      setTimeout(() => loadData(), 500);
    }
  };
  return (
    <div>
      <Header />
      <div style={{ marginTop: "150px" }}>
        <Link to="/parameterTable">
          <center>
            {" "}
            <button className="btn btn-contact">Parameter</button>
          </center>
        </Link>

        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No</th>
              <th style={{ textAlign: "center" }}>Category Code</th>
              <th style={{ textAlign: "center" }}>Parameter Code</th>
              <th style={{ textAlign: "center" }}>Evidence</th>
              <th style={{ textAlign: "center" }}>File Upload</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.categorycode}</td>
                  <td>{item.parametercode}</td>
                  <td>{item.evidence}</td>
                  <td>{item.fileupload}</td>
                  <td>
                    <Link to={`/parput/${item.parameterid}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteobject(item.parameterid)}
                    >
                      Delete
                    </button>
                    <Link to={`/parView/${item.parameterid}`}>
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

export default ParTable;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {} from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Header from "../pages/header";
import Footer from "../pages/footer";
import * as API from "../endpoint";

const RiskGroupTable = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get(API.GET_RISKGROUP_API);
    setData(response.data);
  };
  useEffect(() => {
    loadData();
  }, []);

  const deleteobject = (riskgroupid) => {
    if (window.confirm("Are you sure you want to deleted")) {
      axios.delete(API.DELETE_RISKGROUP_API(riskgroupid));
      console.log("success:", "deleted successfully");
      setTimeout(() => loadData(), 500);
    }
  };
  return (
    <div>
      <Header />
      <div style={{ marginTop: "150px" }}>
        <Link to="/riskgroupTable">
          <center>
            {" "}
            <button className="btn btn-contact">Parameter Category</button>
          </center>
        </Link>

        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No</th>
              <th style={{ textAlign: "center" }}>Risk Group Code</th>
              <th style={{ textAlign: "center" }}>Risk Group Name</th>
              <th style={{ textAlign: "center" }}>File Upload</th>
              <th style={{ textAlign: "center" }}>Risk Group Type</th>
              <th style={{ textAlign: "center" }}>Checkbox</th>
              <th style={{ textAlign: "center" }}>Radio button</th>
              <th style={{ textAlign: "center" }}>Date</th>
              <th style={{ textAlign: "center" }}>Continue Text</th>
              <th style={{ textAlign: "center" }}>Continue Number</th>
              <th style={{ textAlign: "center" }}>Weigth</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.riskgroupcode}</td>
                  <td>{item.riskgroupname}</td>
                  <td>{item.fileupload}</td>
                  <td>{item.riskgrouptype}</td>
                  <td>
                    <input type="checkbox" checked={item.checkbox} readOnly />
                  </td>
                  <td> {item.radiobutton}</td>
                  <td>{item.date}</td>
                  <td>{item.continuetext}</td>
                  <td>{item.continuenumber}</td>
                  <td>{item.weigth}</td>
                  <td>
                    <Link to={`/riskgroupupdate/${item.riskgroupid}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteobject(item.riskgroupid)}
                    >
                      Delete
                    </button>
                    <Link to={`/riskgroupView/${item.riskgroupid}`}>
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

export default RiskGroupTable;

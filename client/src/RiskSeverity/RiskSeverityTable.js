import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {} from "react-toastify";
import axios from "axios";
import Header from "../pages/header";
import Footer from "../pages/footer";
import * as API from "../endpoint";

const RiskSeverityTable = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get(API.GET_RISKSEVERIT_API);
    setData(response.data);
  };
  useEffect(() => {
    loadData();
  }, []);

  const deleteobject = async (riskseverityid) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await axios.delete(API.DELETE_RISKSEVERIT_API(riskseverityid)); // Adjust the endpoint URL.
        console.log("Success: Deleted successfully");
        loadData(); // Refresh the data after deletion.
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <Header />
      <div style={{ marginTop: "150px" }}>
        <Link to="/riskseverityTable">
          <center>
            {" "}
            <button className="btn btn-contact">Add Risk Severity Type</button>
          </center>
        </Link>

        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No</th>
              <th style={{ textAlign: "center" }}>risk severity Type</th>
              <th style={{ textAlign: "center" }}>
                risk severity Type Description
              </th>
              {/*<th style={{textAlign:"center"}}>Icon Upload</th>*/}
              <th style={{ textAlign: "center" }}>file Upload</th>
              <th style={{ textAlign: "center" }}>risk severity</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.riskseveritytype}</td>
                  <td>{item.riskseveritytypedescription}</td>
                  {/*<td>{item.iconupload}</td>*/}
                  <td>{item.fileupload}</td>
                  <td>{item.riskseverityvalue}</td>

                  <td>
                    <Link to={`/riskseverityupdate/${item.riskseverityid}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteobject(item.riskseverityid)}
                    >
                      Delete
                    </button>
                    <Link to={`/riskseverityView/${item.riskseverityid}`}>
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

export default RiskSeverityTable;

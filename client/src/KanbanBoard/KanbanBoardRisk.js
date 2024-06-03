import React, { useEffect, useState } from "react";
import axios from "axios";
import * as API from "../endpoint";
import "./KanbanBoard.css";
import Footer from "../pages/footer";
import Header from "../pages/header";
const KanbanBoardRisk = () => {
  const [tasks, setTasks] = useState([]);
  const [uniqueValues, setUniqueValues] = useState({
    organization: [],
    responsibilitygroup: [],
    responsibilitycenter: [],
    riskdate: [],
    project: [],
    object: [],
    riskname: [],
    riskcode: [],
    category: [],
    // severity: [],
    subcategory: [],
    riskgroup: [],
    risktype: [],
    racitype: [],
    objectname: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API.GET_RISK_API);
      setTasks(response.data);
      const uniqueValuesData = {
        organization: getUniqueValues(response.data, "organization"),
        responsibilitygroup: getUniqueValues(
          response.data,
          "responsibilitygroup"
        ),
        responsibilitycenter: getUniqueValues(
          response.data,
          "responsibilitycenter"
        ),
        riskdate: getUniqueValues(response.data, "riskdate"),
        project: getUniqueValues(response.data, "project"),
        object: getUniqueValues(response.data, "object"),
        riskname: getUniqueValues(response.data, "riskname"),
        riskcode: getUniqueValues(response.data, "riskcode"),
        category: getUniqueValues(response.data, "category"),
        // severity: getUniqueValues(response.data, 'severity'),
        subcategory: getUniqueValues(response.data, "subcategory"),
        riskgroup: getUniqueValues(response.data, "riskgroup"),
        risktype: getUniqueValues(response.data, "risktype"),
        racitype: getUniqueValues(response.data, "racitype"),
        objectname: getUniqueValues(response.data, "objectname"),
      };
      console.log("Unique Values Data:", uniqueValuesData); // Log the unique values data
      setUniqueValues(uniqueValuesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const taskColumns = {
    Open: [],
    Discussion: [],
    Controlled: [],
    "Under Observation": [],
    Closed: [],
  };

  tasks.forEach((task) => {
    const { status } = task;
    if (taskColumns[status]) {
      taskColumns[status].push(task);
    }
  });

  const getUniqueValues = (data, key) => {
    const uniqueValues = [...new Set(data.map((item) => item[key]))];
    return uniqueValues.filter(
      (value) => value !== undefined && value !== null
    );
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  return (
    <div>
      <Header />
      <div>
        <center>
          <h1>Kanban Board</h1>
        </center>
        <div
          className="additional-input-fields"
          style={{
            marginRight: "50px",
            marginLeft: "50px",
            marginBottom: "5px",
            marginTop: "2px",
            padding: "0px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
            gap: "10px",
          }}
        >
          <div>
            <label htmlFor="organization">Organization:</label>
            <input
              id="organization"
              type="text"
              placeholder="organization"
              defaultValue={uniqueValues.organization[0]}
            />
          </div>
          <div>
            <label htmlFor="responsibilityGroup">Responsibility Group:</label>
            <input
              id="responsibilityGroup"
              type="text"
              placeholder="Responsibility Group"
              defaultValue={uniqueValues.responsibilitygroup[0]}
            />
          </div>

          <div>
            <label htmlFor="responsibilityCenter">Responsibility Center:</label>
            <input
              id="responsibilityCenter"
              type="text"
              placeholder="Responsibility Center"
              defaultValue={uniqueValues.responsibilitycenter[0]}
            />
          </div>

          <div>
            <label htmlFor="riskdate">Risk Date:</label>
            <input
              id="riskdate"
              type="text"
              placeholder="risk date"
              defaultValue={formatDate(uniqueValues.riskdate[0])}
            />
          </div>

          <div>
            <label htmlFor="project">Project:</label>
            <input
              id="project"
              type="text"
              placeholder="Project"
              defaultValue={uniqueValues.project[0]}
            />
          </div>

          <div>
            <label htmlFor="object">Object:</label>
            <input
              id="object"
              type="text"
              placeholder="object"
              defaultValue={uniqueValues.object[0]}
            />
          </div>

          <div>
            <label htmlFor="riskname">Risk Name:</label>
            <input
              id="riskname"
              type="text"
              placeholder="riskname"
              defaultValue={uniqueValues.riskname[0]}
            />
          </div>

          <div>
            <label htmlFor="riskcode">Risk Code:</label>
            <input
              id="riskcode"
              type="text"
              placeholder="riskcode"
              defaultValue={uniqueValues.riskcode[0]}
            />
          </div>

          <div>
            <label htmlFor="category">Category:</label>
            <input
              id="category"
              type="text"
              placeholder="category"
              defaultValue={uniqueValues.category[0]}
            />
          </div>

          {/* <div>
  <label htmlFor="severity">severity:</label>
  <input id="severity" type="text" placeholder="severity" defaultValue={uniqueValues.severity[0]} />
</div> */}

          <div>
            <label htmlFor="subcategory">Sub Category:</label>
            <input
              id="subcategory"
              type="text"
              placeholder="subcategory"
              defaultValue={uniqueValues.subcategory[0]}
            />
          </div>

          <div>
            <label htmlFor="riskgroup">Risk Group:</label>
            <input
              id="riskgroup"
              type="text"
              placeholder="riskgroup"
              defaultValue={uniqueValues.riskgroup[0]}
            />
          </div>

          <div>
            <label htmlFor="risktype">Risk Type:</label>
            <input
              id="risktype"
              type="text"
              placeholder="risktype"
              defaultValue={uniqueValues.risktype[0]}
            />
          </div>

          <div>
            <label htmlFor="racitype">RACI Type:</label>
            <input
              id="racitype"
              type="text"
              placeholder="racitype"
              defaultValue={uniqueValues.racitype[0]}
            />
          </div>

          <div>
            <label htmlFor="objectname">Object Name:</label>
            <input
              id="objectname"
              type="text"
              placeholder="objectname"
              defaultValue={uniqueValues.objectname[0]}
            />
          </div>
        </div>
        <div className="kanban-board">
          {Object.keys(taskColumns).map((status, index) => (
            <div
              key={index}
              className={`column ${status
                .toLowerCase()
                .replace(" ", "-")}-column`}
            >
              <h3>{status}</h3>
              <div className="tasks">
                {taskColumns[status].map((task) => (
                  <div key={task.riskid} className="task">
                    {/* <p>Project: {task.project}</p> */}
                    <div>
                      <p>
                        {" "}
                        <b>Risk Owner: </b>
                        {task.riskowner}
                      </p>
                      <p>
                        <b>Action Plan: </b> {task.actionplan}
                      </p>
                      <p>
                        <b>Risk Severity: </b> {task.severity}
                      </p>
                      <p>
                        <b>Description: </b>
                        {task.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoardRisk;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../pages/header";
import Footer from "../pages/footer";
import * as API from "../endpoint";
import axios from "axios";
import "../pages/file.css";
const RiskChecklist = () => {
  const { checklistid, riskid } = useParams();

  const location = useLocation();
  const navigate = useNavigate();
  // Initialize state with URL parameters
  const queryParams = new URLSearchParams(location.search);
  const initialState = {
    organization: queryParams.get("organization") || "",
    project: queryParams.get("project") || "",
    riskcode: queryParams.get("riskcode") || "",
    responsibilitygroup: queryParams.get("responsibilitygroup") || "",
    responsibilitycenter: queryParams.get("responsibilitycenter") || "",
    objecttype: queryParams.get("objecttype") || "",
    object: queryParams.get("object") || "",
    riskname: queryParams.get("riskname") || "",
    theme: queryParams.get("theme") || "",
    phase: [],
    activitygroup: [],
    activity: [],
    expectedevidence: [],
    remark: [],
    percentagecompletion: [],
    actualevidence: [],
    status: [],
    planstartdate: [],
    planenddate: [],
    actualstartdate: [],
    actualenddate: [],
    activitycode: [],
    algorithminventoryid: null,
    resources: [], // Initialize selectedResources state
    stakeholdername: [],
    designation: [],
    themesource: "Risk Theme Activity",
  };

  const [formData, setFormData] = useState(initialState);
  const [activityData, setActivityData] = useState([]);
  const [resourceList, setResourceList] = useState([]);
  const { theme, selectedResources } = formData; // Destructure selectedResources from formData
  const [stakeholder, setStakeholder] = useState([]);
  const [selectedDesignations, setSelectedDesignations] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [groupedResources, setGroupedResources] = useState({});

  const handleDesignationChange = (e, index) => {
    const newDesignation = e.target.value;
    const newSelectedDesignations = [...selectedDesignations];
    newSelectedDesignations[index] = newDesignation;
    setSelectedDesignations(newSelectedDesignations);

    // Update formData with the new designation
    const newFormData = { ...formData };
    newFormData.designation[index] = newDesignation;
    setFormData(newFormData);

    // Filter resources based on the selected designation
    const resourcesForDesignation = resourceList.filter(
      (resource) => resource.designation === newDesignation
    );
    setFilteredResources(resourcesForDesignation);
  };

  const groupResourcesByDesignation = (resources) => {
    const grouped = {};
    resources.forEach((resource) => {
      if (!grouped[resource.designation]) {
        grouped[resource.designation] = [];
      }
      grouped[resource.designation].push(resource);
    });
    return grouped;
  };

  const loadData = async () => {
    try {
      const response = await axios.get(
        `https://staging.apilayer.valuevalidator.com/node-api/api/themeactivity/${theme}`
      );
      setActivityData(response.data);
      const resourceResponse = await axios.get(
        `https://staging.apilayer.valuevalidator.com/node-api/api/resourceget`
      );
      setResourceList(resourceResponse.data);
      const stakeholderResponse = await axios.get(
        `https://staging.apilayer.valuevalidator.com/node-api/api/vendormasterget`
      );
      setStakeholder(stakeholderResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [theme]);

  useEffect(() => {
    setGroupedResources(groupResourcesByDesignation(resourceList));
  }, [resourceList]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newFormData = { ...formData };

    if (Array.isArray(newFormData[name])) {
      const newArray = [...newFormData[name]];
      newArray[index] = value;
      newFormData[name] = newArray;
    } else {
      newFormData[name] = value;
    }

    setFormData(newFormData);
  };

  const handleSubmit = async (e, rowIndex) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://staging.apilayer.valuevalidator.com/node-api/api/addchecklist",
        {
          organization: formData.organization,
          project: formData.project,
          projectcode: formData.riskcode,
          responsibilitygroup: formData.responsibilitygroup,
          responsibilitycenter: formData.responsibilitycenter,
          objecttype: formData.objecttype,
          object: formData.object,
          codename: formData.riskname,
          theme: formData.theme,
          phase: activityData[rowIndex].phase,
          activitygroup: activityData[rowIndex].activitygroup,
          activity: activityData[rowIndex].activity,
          expectedevidence: activityData[rowIndex].expectedevidence,
          remark: formData.remark[rowIndex],
          percentagecompletion: formData.percentagecompletion[rowIndex],
          actualevidence: formData.actualevidence[rowIndex],
          status: formData.status[rowIndex],
          planstartdate: formData.planstartdate[rowIndex],
          planenddate: formData.planenddate[rowIndex],
          actualstartdate: formData.actualstartdate[rowIndex],
          actualenddate: formData.actualenddate[rowIndex],
          activitycode: formData.activitycode[rowIndex],
          resources: formData.resources, // Include selectedResources in the request body
          stakeholdername: formData.stakeholdername,
          designation: formData.designation,
          riskid,
          themesource: "Risk Theme Activity",
        }
      );
      if (response.status === 200) {
        toast.success("Data added successfully");
        navigate(`/checklistTable/${riskid}`);
      }
    } catch (error) {
      toast.error(error.response?.data || "An error occurred");
    }
  };

  return (
    <div>
      <Header />
      <div>
        <center>
          <h1>Risk Activity</h1>
        </center>
        {/* Master Section - Company and Project Details */}
        <div
          style={{
            border: "3px solid #ccc",
            padding: "10px",
          }}
        >
          {/* Company Details */}
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr ",
                gap: "40px",
              }}
            >
              <div>
                {" "}
                <p>
                  <strong>Organization : </strong> {formData.organization}
                </p>
              </div>
              <div>
                <p>
                  <strong>Responsibility Center : </strong>{" "}
                  {formData.responsibilitycenter}
                </p>
              </div>
              <div>
                <p>
                  <strong>Responsibility Group : </strong>
                  {formData.responsibilitygroup}
                </p>
              </div>
              <div>
                <p>
                  <strong>Object Type : </strong>
                  {formData.objecttype}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr ",
                gap: "40px",
              }}
            >
              <div>
                {" "}
                <p>
                  <strong>Object : </strong> {formData.object}
                </p>
              </div>
              <div>
                <p>
                  <strong>Project : </strong>
                  {formData.project}
                </p>
              </div>
              <div>
                <p>
                  <strong>Risk Name : </strong>
                  {formData.riskname}
                </p>
              </div>
              <div>
                {" "}
                <p>
                  <strong>Risk Code : </strong>
                  {formData.riskcode}
                </p>
              </div>
            </div>
            {/* Vertical partition */}
            <div
              style={{
                width: "10px",
                background: "#ccc",
                alignContent: "end",
              }}
            ></div>
            {/* Project Details */}
          </div>
        </div>

        <div style={{ textAlign: "left", marginLeft: "2cm" }}>
          <div>
            <p>
              <strong>Theme : </strong>
              {formData.theme}
            </p>
          </div>
        </div>

        <hr
          style={{ width: "100%", marginLeft: "0", border: "3px solid #ccc" }}
        ></hr>
        <form
          style={{
            fontFamily: "Poppins",
            margin: "auto",
            padding: "5px",
            alignContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <div
            style={{
              padding: "5px",
            }}
          >
            <table
              className="styled-table"
              style={{
                maxWidth: "100%",
                margin: "1px",
                fontSize: "0.8em",
                marginBottom: "3cm",
              }}
            >
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>Sr No.</th>
                  <th>Phase</th>
                  <th>Activity Group</th>
                  <th> Activity/Task</th>
                  <th>Expected Evidence</th>
                  <th>Stake Holder</th>
                  <th>Designation</th>
                  <th>Resources</th> {/* Add column for resources */}
                  <th>Activity Code</th>
                  <th>Status</th>
                  <th>Actual Evidence</th>
                  <th>Percentage Completion</th>
                  <th>Remark</th>
                  <th>Plan Start Date</th>
                  <th>Plan End Date</th>
                  <th>Actual Start Date</th>
                  <th>Actual End Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {activityData.map((activity, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{activity.phase}</td>
                    <td>{activity.activitygroup}</td>
                    <td>{activity.activity}</td>
                    <td>{activity.expectedevidence}</td>
                    <td>
                      <div>
                        <select
                          name="stakeholdername"
                          value={formData.stakeholdername[index] || ""}
                          onChange={(e) => handleInputChange(e, index)}
                        >
                          <option value=""> Select Stake Holder(s)</option>
                          {stakeholder.map((stakeholder) => (
                            <option
                              key={stakeholder.vendorid}
                              value={stakeholder.vendorname}
                            >
                              {stakeholder.vendorname}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div>
                        <select
                          name="designation"
                          value={formData.designation[index] || ""}
                          onChange={(e) => handleDesignationChange(e, index)}
                        >
                          <option value=""> Select Designation</option>
                          {Object.keys(groupedResources).map((designation) => (
                            <option key={designation} value={designation}>
                              {designation}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td>
                      <div>
                        <select
                          name="resources"
                          value={formData.resources[index] || ""}
                          onChange={(e) => handleInputChange(e, index)}
                        >
                          <option value=""> Select resource(s)</option>
                          {filteredResources.map((resource) => (
                            <option
                              key={resource.resourceid}
                              value={resource.resourcename}
                            >
                              {resource.resourcename}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td>
                      <input
                        name="activitycode"
                        type="text"
                        value={formData.activitycode[index] || ""}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <select
                        name="status"
                        type="text"
                        value={formData.status[index] || ""}
                        onChange={(e) => handleInputChange(e, index)}
                      >
                        <option value="">Status</option>
                        <option value="Open">Open</option>
                        <option value="In-Progress">In-Progress</option>
                        <option value="Closed">Closed</option>
                        <option value="Packed">Parked</option>
                        <option value="Aborted">Aborted</option>
                      </select>
                    </td>
                    <td>
                      <input
                        name="actualevidence"
                        type="text"
                        value={formData.actualevidence[index] || ""}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        name="percentagecompletion"
                        type="number"
                        value={formData.percentagecompletion[index] || ""}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        name="remark"
                        type="text"
                        value={formData.remark[index] || ""}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        name="planstartdate"
                        type="date"
                        value={formData.planstartdate[index] || ""}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        name="planenddate"
                        type="date"
                        value={formData.planenddate[index] || ""}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        name="actualstartdate"
                        type="date"
                        value={formData.actualstartdate[index] || ""}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        name="actualenddate"
                        type="date"
                        value={formData.actualenddate[index] || ""}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <div>
                        <input
                          type="submit"
                          value={checklistid ? "Update" : "Save"}
                          onClick={(e) => handleSubmit(e, index)}
                        />
                      </div>
                      <button className="btn btn-edit">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default RiskChecklist;

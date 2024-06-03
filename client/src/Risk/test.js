import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Header from "../pages/header";
import Footer from "../pages/footer";

const initialState = {
  groupid: null,
  groupname: "",
  thrustid: null,
  thrustarea: "",
  controlid: null,
  controlname: "",
  controlwt: "",
  subcontrolid: null,
  subcontrolname: "",
  subcontrolwt: "",
  evidencereferencelink: "",
  evidenceremark: "",
  evidenceupload: "",
  evidencestatus: "",
};

const Evidence = (props) => {
  const [state, setState] = useState(initialState);
  const [subControlNames, setSubControlNames] = useState([]);
  const [controlNames, setControlNames] = useState([]);
  const [groupNames, setGroupNames] = useState([]);
  const [isReadOnly, setIsReadOnly] = useState(true); // Added state
  const [company, setCompany] = useState([]);
  const [project, setProjects] = useState({});
  const [data, setData] = useState([]);

  const {
    groupid,
    groupname,
    thrustid,
    thrustarea,
    controlid,
    controlname,
    controlwt,
    subcontrolid,
    subcontrolname,
    subcontrolwt,
    evidencereferencelink,
    evidenceremark,
    evidenceupload,
    evidencestatus,
  } = state;
  const { resultid, companyid, projectid } = useParams();
  const history = useHistory();

  /**********To Get The Thrust Area*********** */
  const loadData = async () => {
    try {
      const response = await axios.get(
        "https://staging.apilayer.valuevalidator.com/risk-api/thrustarea/api"
      );
      const sortedData = response.data.sort(
        (a, b) => b.companyid - a.companyid
      );
      setData(sortedData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  useEffect(() => {
    if (resultid) {
      try {
        axios
          .get(
            `https://staging.apilayer.valuevalidator.com/risk-api/resultGovernanceget/api/${resultid}`
          )
          .then((resp) => setState({ ...resp.data[0] }))
          .catch((error) => {
            console.error(
              "An error occurred while fetching the Governance Audit :",
              error
            );
          });
      } catch (error) {
        console.error(
          "An error occurred while fetching the Governance Audit:",
          error
        );
      }
    }
    loadData();
    axios
      .get(
        `https://staging.apilayer.valuevalidator.com/risk-api/companyget/api/${companyid}`
      )
      .then((resp) => setCompany({ ...resp.data[0] }))
      .catch((error) => {
        console.error(
          "An error occurred while fetching the Project Phase:",
          error
        );
      });

    axios
      .get(
        `https://staging.apilayer.valuevalidator.com/risk-api/specificproject/${projectid}`
      )
      .then((resp) => setProjects({ ...resp.data[0] }))
      .catch((error) => {
        console.error(
          "An error occured while fetching the Project Details:",
          error
        );
      });

    axios
      .get(
        "https://staging.apilayer.valuevalidator.com/risk-api/getGovernancesubcontrol/api"
      )
      .then((response) => {
        setSubControlNames(response.data);
      })
      .catch((error) => {
        console.error(
          "An error occurred while fetching subcontrol names:",
          error
        );
      });

    axios
      .get(
        "https://staging.apilayer.valuevalidator.com/risk-api/controlGovernance/api"
      )
      .then((response) => {
        setControlNames(response.data);
      })
      .catch((error) => {
        console.error(
          "An error occurred while fetching subcontrol names:",
          error
        );
      });

    axios
      .get(
        "https://staging.apilayer.valuevalidator.com/risk-api/GovernanceGroupget/api"
      )
      .then((response) => {
        setGroupNames(response.data);
      })
      .catch((error) => {
        console.error("Error fetching group names:", error);
      });
    if (props.location.state && props.location.state.governanceDetails) {
      const { governanceDetails } = props.location.state;
      setState((prevState) => ({
        ...prevState,
        groupid: governanceDetails.groupid,
        groupname: governanceDetails.groupname,
        thrustid: governanceDetails.thrustid,
        thrustarea: governanceDetails.thrustarea,
        controlid: governanceDetails.controlid,
        controlname: governanceDetails.controlname,
        controlwt: governanceDetails.controlwt,
        subcontrolid: governanceDetails.subcontrolid,
        subcontrolname: governanceDetails.subcontrolname,
        subcontrolwt: governanceDetails.subcontrolwt,
      }));
      setIsReadOnly(true); // Set readonly mode
    } else {
      setIsReadOnly(false);
    }
  }, [resultid, companyid, projectid, props.location.state]);

  /**********Handle Changes************ */
  const handleInputChangeThrustArea = (event) => {
    const selectedValue = event.target.value;
    const [thrustid, thrustarea] = selectedValue.split("|");
    setState({
      ...state,
      thrustid: thrustid,
      thrustarea: thrustarea,
    });
  };
  /***************** ********/

  const handleInputChangeGroup = (event) => {
    const selectedValue = event.target.value;
    const [groupid, groupname] = selectedValue.split("|");
    setState({
      ...state,
      groupid: groupid,
      groupname: groupname,
    });
  };
  /*********************** */

  /******************************* */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "controlid") {
      const selectedControl = controlNames.find(
        (control) => control.controlid === value
      );

      console.log("Selected Control:", selectedControl);

      setState((prevState) => ({
        ...prevState,
        [name]: value,
        controlwt: selectedControl ? selectedControl.controlwt : "",
        controlname: selectedControl ? selectedControl.controlname : "", // Add this line
      }));
    } else if (name === "subcontrolid") {
      const selectedSubControl = subControlNames.find(
        (subcontrol) => subcontrol.subcontrolid === value
      );

      console.log("Selected SubControl:", selectedSubControl);

      setState((prevState) => ({
        ...prevState,
        [name]: value,
        subcontrolwt: selectedSubControl ? selectedSubControl.subcontrolwt : "",
        subcontrolname: selectedSubControl
          ? selectedSubControl.subcontrolname
          : "", // Add this line
      }));
    } else {
      setState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !groupid ||
      !groupname ||
      !thrustid ||
      !thrustarea ||
      !controlid ||
      !controlname ||
      !controlwt ||
      !subcontrolid ||
      !subcontrolname ||
      !subcontrolwt ||
      !evidencereferencelink ||
      !evidenceremark ||
      !evidenceupload ||
      !evidencestatus
    ) {
      toast.error("please provide the Input");
    } else {
      if (!resultid) {
        axios
          .post(
            `https://staging.apilayer.valuevalidator.com/risk-api/evidence/${projectid}/${companyid}`,
            {
              groupid,
              groupname,
              thrustid,
              thrustarea,
              controlid,
              controlname,
              controlwt,
              subcontrolid,
              subcontrolname,
              subcontrolwt,
              evidencereferencelink,
              evidenceremark,
              evidenceupload,
              evidencestatus,
            }
          )
          .then(() => {
            setState({ initialState });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success(" Audit result added");
      } else {
        axios
          .put(
            `https://staging.apilayer.valuevalidator.com/risk-api/evidenceEdit/${resultid}`,
            {
              groupid,
              groupname,
              thrustid,
              thrustarea,
              controlid,
              controlname,
              controlwt,
              subcontrolid,
              subcontrolname,
              subcontrolwt,
              evidencereferencelink,
              evidenceremark,
              evidenceupload,
              evidencestatus,
            }
          )
          .then(() => {
            setState({ initialState });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Audit Results Updated");
      }
      setTimeout(
        () => history.push(`/evidenceList/${projectid}/${companyid}`),
        500
      );
    }
  };

  return (
    <div>
      <Header />
      <div style={{ display: "flex", marginTop: "10px", font: "Poppins" }}>
        {/* Master Section - Company and Project Details */}
        <div
          style={{
            border: "3px solid #ccc",
            padding: "5px",
            flex: 1,
            display: "flex",
          }}
        >
          {/* Company Details */}
          <div style={{ flex: 1, marginRight: "50px", textAlign: "left" }}>
            <h2>{company.companyname}</h2>
            {/* Display company details here */}
            <div>
              <p>Contact Person : {company.contactname}</p>
              <p>Contact Email : {company.contactemail}</p>
              <p>Contact phone : {company.contactphone}</p>
              {/* Add other company details like contact name, email, phone */}
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
          <div style={{ flex: 1, paddingLeft: "20px", textAlign: "left" }}>
            <h2>Project Details</h2>
            {/* Display project details here */}
            <div>
              <p>Project Name : {project.projectname}</p>
              <p>Start Date : {formatDate(project.fromdate)}</p>
              <p>End Date : {formatDate(project.todate)}</p>

              {/* Add other project details like start date, end date */}
            </div>
          </div>
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

      {/* Details Section - Governance Test Results Form */}
      <div style={{ marginTop: "5px", padding: "20px" }}>
        <form
          style={{
            fontFamily: "Poppins",
            margin: "0px",
          }}
          onSubmit={handleSubmit}
        >
          {/* Governance Test Results Form */}
          <div style={{ marginBottom: "20px" }}>
            {/* DetailsForm component with controlNames, controlnames, etc. */}
            <DetailsForm
              controlNames={controlNames}
              subControlNames={subControlNames}
              state={state}
              groupNames={groupNames}
              data={data}
              handleInputChange={handleInputChange}
              handleInputChangeThrustArea={handleInputChangeThrustArea}
              handleInputChangeGroup={handleInputChangeGroup}
              isReadOnly={isReadOnly} // Pass readonly mode to DetailsForm
            />
          </div>

          {/* Master Form Buttons */}
          <div>
            <input type="submit" value={resultid ? "Update" : "Save"} />
            <Link to={`/evidenceList/${projectid}/${companyid}`}>
              <input
                style={{
                  fontFamily: "Poppins",
                  backgroundColor: "#3386ff",
                  width: "100px",
                }}
                type="button"
                value="Go back"
              />
            </Link>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

const DetailsForm = ({
  controlNames,
  subControlNames,
  groupNames,
  state,
  handleInputChange,
  handleInputChangeThrustArea,
  handleInputChangeGroup,
  isReadOnly,
  data,
}) => {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
          gap: "40px",
        }}
      >
        {/* Details Form Inputs */}
        <div>
          <label>Governance Group :</label>
          <select
            style={{
              fontFamily: "Poppins",
              color: isReadOnly ? "#000000" : "#000000", // Grey for readonly
              backgroundColor: isReadOnly ? "#f4f4f4" : "#ffffff", // Background color for readonly
            }}
            id="groupname"
            name="groupname"
            value={`${state.groupid}|${state.groupname}`}
            onChange={handleInputChangeGroup}
            disabled={isReadOnly} // Disable if in read-only mode
          >
            <option value="">Select Group Name </option>
            {groupNames.map((group) => (
              <option
                key={group.groupid}
                value={`${group.groupid}|${group.groupname}`}
                disabled={isReadOnly} // Disable each option if in read-only mode
              >
                {group.groupname}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Governance Thrust Area :</label>
          <select
            style={{
              fontFamily: "Poppins",
              color: isReadOnly ? "#000000" : "#000000", // Grey for readonly
              backgroundColor: isReadOnly ? "#eee" : "#ffffff", // Background color for readonly
            }}
            id="thrustarea"
            name="thrustarea"
            value={`${state.thrustid}|${state.thrustarea}`}
            onChange={handleInputChangeThrustArea}
            disabled={isReadOnly}
          >
            <option value="">Select Thrust Area </option>
            {data.map((area) => (
              <option
                key={area.thrustid}
                value={`${area.thrustid}|${area.thrustarea}`}
              >
                {area.thrustarea}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="controlid">Control Name:</label>
          <select
            style={{
              fontFamily: "Poppins",
              color: isReadOnly ? "#000000" : "#000000", // Grey for readonly
              backgroundColor: isReadOnly ? "#eee" : "#ffffff", // Background color for readonly
            }}
            id="controlid"
            name="controlid"
            value={state.controlid}
            onChange={handleInputChange}
            disabled={isReadOnly}
          >
            <option value="">Select Control</option>
            {/* Populate the options based on your data */}
            {controlNames.map((control) => (
              <option key={control.controlid} value={control.controlid}>
                {control.controlname}
              </option>
            ))}
          </select>
        </div>
        <div>
          {" "}
          <label>Control Weight : </label>
          <input
            style={{
              fontFamily: "Poppins",
              color: isReadOnly ? "#000000" : "#000000", // Grey for readonly
              backgroundColor: isReadOnly ? "#eee" : "#ffffff", // Background color for readonly
            }}
            type="text"
            id="controlwt"
            name="controlwt"
            placeholder="Control Weight"
            disabled={isReadOnly}
            value={state.controlwt || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="subcontrolid">Sub-Control Name:</label>
          <select
            style={{
              fontFamily: "Poppins",
              color: isReadOnly ? "#000000" : "#000000", // Grey for readonly
              backgroundColor: isReadOnly ? "#eee" : "#ffffff", // Background color for readonly
            }}
            id="subcontrolid"
            name="subcontrolid"
            value={state.subcontrolid}
            onChange={handleInputChange}
            disabled={isReadOnly}
          >
            {/* Populate the options based on your data */}
            {subControlNames.map((subcontrol) => (
              <option
                key={subcontrol.subcontrolid}
                value={subcontrol.subcontrolid}
              >
                {subcontrol.subcontrolname}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Sub-Control Weight : </label>
          <input
            style={{
              fontFamily: "Poppins",
              color: isReadOnly ? "#000000" : "#000000", // Grey for readonly
              backgroundColor: isReadOnly ? "#eee" : "#ffffff", // Background color for readonly
            }}
            type="text"
            id="subcontrolwt"
            name="subcontrolwt"
            placeholder="Sub-Control Weight"
            disabled={isReadOnly}
            value={state.subcontrolwt || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* Divider */}
      <hr style={{ margin: "30px 0px ", border: "3px solid #ccc" }} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr ",
          gap: "40px",
        }}
      >
        <div>
          <label>Evidence Reference Link :</label>
          <input
            style={{ fontFamily: "Poppins" }}
            type="text"
            id="evidencereferencelink"
            name="evidencereferencelink"
            placeholder="Enter the Evidence Reference Link"
            value={state.evidencereferencelink || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Upload Evidence : </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <br />
            <input
              style={{ fontFamily: "Poppins", marginRight: "10px" }}
              type="text"
              id="evidenceupload"
              name="evidenceupload"
              placeholder="Enter the Evidence upload link"
              value={state.evidenceupload || ""}
              onChange={handleInputChange}
            />
            <div style={{ position: "relative" }}></div>
            <a
              href="http://drive.google.com/drive/folders/1AJ8YN8wgFtDWkPk0YCWYtNok1c2xuQeY?usp=share_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Upload file here
            </a>
          </div>
        </div>
        <div>
          <label>Evidence Remark :</label>
          <input
            style={{ fontFamily: "Poppins" }}
            type="text"
            id="evidenceremark"
            name="evidenceremark"
            placeholder="Enter the Evidence Reference Link"
            value={state.evidenceremark || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Evidence Status : </label>
          <select
            style={{ fontFamily: "Poppins" }}
            id="evidencestatus"
            name="evidencestatus"
            value={state.evidencestatus}
            g
            onChange={handleInputChange}
          >
            <option value="">Select Status</option>
            <option value="pass">Pass</option>
            <option value="fail">Fail</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Evidence;

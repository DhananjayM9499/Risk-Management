import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./TableRisk.css";
import * as API from "../endpoint";
import Footer from "../pages/footer";
import Header from "../pages/header";

const initialState = {
  organization: " ",
  responsibilitygroup: " ",
  responsibilitycenter: " ",
  riskdate: " ",
  projectname: " ",
  object: " ",
  riskname: " ",
  riskcode: " ",
  category: " ",
  severity: " ",
  riskgroup: " ",
  subcategory: " ",
  description: " ",
  owner: " ",
  actionplan: " ",
  assigned: " ",
  status: " ",
  expectedcompletiondate: " ", // Add this line
  actualcompletiondate: " ",
  complianceimplication: " ",
  fileupload: " ",
  vulnerability: " ",
  threat: " ",
  confidentiality: 1,
  availability: 1,
  integrity: 1,
  probability: 1,
  impact: 1,
  riskexposure: 1,
  objectname: " ",
  newvalue: 0,
  oldvalue: 0,
  residualrisk: 0,
  controlowner: " ",
  mitigationstrategy: " ",
  contingencystrategy: " ",
  groupname: " ",
  thrustarea: " ",
  controlname: " ",
  controlwt: " ",
  subcontrolname: " ",
  subcontrolwt: " ",
  remark: " ",
  updatedate: " ",
  confidentialitySecondAsset: " ",
  availabilitySecondAsset: " ",
  integritySecondAsset: " ",
  impactSecondAsset: " ",
  probabilitySecondAsset: " ",
  riskExposureSecondAsset: " ",
  residualRiskSecondAsset: " ",
};
const ControlUpadte = (props) => {
  const [state, setState] = useState(initialState);
  const [riskNames, setRisk] = useState([]);
  const [respGroup, setRespGroup] = useState([]);
  const [respCenter, setRespCenter] = useState([]);
  const [objectType, setObjectType] = useState([]);
  const [riskSeverity, setRiskSeverity] = useState([]);
  const [riskCategory, setRiskCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [objectName, setObjectName] = useState([]);
  const [organizationComp, setOrganizationComp] = useState([]);
  const [isReadOnly, setIsReadOnly] = useState(true); // Added state
  const [groupNames, setGroupNames] = useState([]);
  const [thrustName, setThrustName] = useState([]);
  const [subControlNames, setSubControlNames] = useState([]);
  const [controlNames, setControlNames] = useState([]);
  const [projectName, setProject] = useState([]);

  const {
    organization,
    responsibilitygroup,
    responsibilitycenter,
    riskdate,
    projectname,
    object,
    riskname,
    riskcode,
    category,
    severity,
    riskgroup,
    subcategory,
    description,
    owner,
    actionplan,
    assigned,
    status,
    expectedcompletiondate,
    actualcompletiondate,
    complianceimplication,
    fileupload,
    vulnerability,
    threat,
    objectname,
    newvalue,
    oldvalue,
    controlowner,
    mitigationstrategy,
    contingencystrategy,
    groupname,
    thrustarea,
    controlname,
    controlwt,
    subcontrolname,
    subcontrolwt,
    remark,
    updatedate,
    confidentialitySecondAsset,
    impactSecondAsset,
    probabilitySecondAsset,
    availabilitySecondAsset,
    integritySecondAsset,
    riskExposureSecondAsset,
    residualRiskSecondAsset,
  } = state;

  const navigate = useNavigate();
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const { riskid } = useParams();

  useEffect(() => {
    if (riskid) {
      axios.get(API.VIEW_RISK_API(riskid)).then((resp) => {
        const editedData = resp.data[0];
        setState({
          ...editedData,
          asset: true,
          calculateriskexposure: true,
          secondAsset: true,
          calculateSecondRiskExposure: true,
          groupname: " ",
          thrustarea: " ",
          controlname: " ",
          controlwt: " ",
          subcontrolname: " ",
          subcontrolwt: " ",
          remark: " ",
          updatedate: " ",
          controlowner: "",
          riskdate: new Date(editedData.riskdate).toLocaleDateString("en-CA"),
          expectedcompletiondate: new Date(
            editedData.expectedcompletiondate
          ).toLocaleDateString("en-CA"),
          actualcompletiondate: new Date(
            editedData.actualcompletiondate
          ).toLocaleDateString("en-CA"),
        });
      });
    }
    axios.get(API.GET_RISKGROUP_API).then((resp) => setRisk(resp.data));
    axios
      .get(API.GET_RESPONSIBILITYGROUP_API)
      .then((resp) => setRespGroup(resp.data));
    axios
      .get(API.GET_RESPONSIBILITYCENTER_API)
      .then((resp) => setRespCenter(resp.data));
    axios.get(API.GET_OBJECTTYPE_API).then((resp) => setObjectType(resp.data));
    axios
      .get(API.GET_RISKSEVERIT_API)
      .then((resp) => setRiskSeverity(resp.data));
    axios
      .get(API.GET_RISKCATEGORY_API)
      .then((resp) => setRiskCategory(resp.data));
    axios
      .get(API.GET_SUBCATEGORY_API)
      .then((resp) => setSubCategory(resp.data));
    axios.get(API.GET_OBJECTNAME_API).then((resp) => setObjectName(resp.data));
    axios
      .get(API.GET_COMPANY_API)
      .then((resp) => setOrganizationComp(resp.data));
    // axios
    //   .get(
    //     "https://staging.apilayer.valuevalidator.com/risk-api/GovernanceGroupget/api"
    //   )
    //   .then((resp) => setGroup(resp.data));
    // axios
    //   .get(
    //     "https://staging.apilayer.valuevalidator.com/risk-api/thrustarea/api"
    //   )
    //   .then((resp) => setThrust(resp.data));
    axios
      .get(API.GET_GROUP_API)
      .then((response) => {
        setGroupNames(response.data);
      })
      .catch((error) => {
        console.error("Error fetching group names:", error);
      });
    // axios
    //   .get(
    //     "https://staging.apilayer.valuevalidator.com/risk-api/getGovernancesubcontrol/api"
    //   )
    //   .then((response) => {
    //     setSubControlNames(response.data);
    //   });
    // axios
    //   .get(
    //     "https://staging.apilayer.valuevalidator.com/risk-api/controlGovernance/api"
    //   )
    //   .then((response) => {
    //     setControlNames(response.data);
    //   });
    axios.get(API.GET_PROJECTNAME_API).then((response) => {
      setProject(response.data);
    });

    if (
      props &&
      props.location &&
      props.location.state &&
      props.location.state.riskDetails
    ) {
      const { riskDetails } = props.location.state;
      setState((prevState) => ({
        ...prevState,
        organization: riskDetails.organization,
        responsibilitygroup: riskDetails.responsibilitygroup,
        responsibilitycenter: riskDetails.responsibilitycenter,
        riskdate: riskDetails.riskdate,
        projectname: riskDetails.projectname,
        object: riskDetails.object,
        riskname: riskDetails.riskname,
        riskcode: riskDetails.riskcode,
        category: riskDetails.category,
        severity: riskDetails.severity,
        riskgroup: riskDetails.riskgroup,
        subcategory: riskDetails.subcategory,
        description: riskDetails.description,
        actionplan: riskDetails.actionplan,
        assigned: riskDetails.assigned,
        status: riskDetails.status,
        expectedcompletiondate: riskDetails.expectedcompletiondate,
        actualcompletiondate: riskDetails.actualcompletiondate,
        complianceimplication: riskDetails.complianceimplication,
        fileupload: riskDetails.fileupload,
        vulnerability: riskDetails.vulnerability,
        threat: riskDetails.threat,
        objectname: riskDetails.objectname,
        newvalue: riskDetails.newvalue,
        oldvalue: riskDetails.oldvalue,
        mitigationstrategy: riskDetails.mitigationstrategy,
        contingencystrategy: riskDetails.contingencystrategy,
        remark: riskDetails.remark,
        updatedate: riskDetails.updatedate,
      }));
      setIsReadOnly(true); // Set readonly mode
    } else {
      setIsReadOnly(false);
    }
  }, [riskid, props && props.location && props.location.state, props]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!organization) {
      toast.error("Please provide a value for each input field");
    } else {
      const requestData = {
        organization,
        responsibilitygroup,
        responsibilitycenter,
        riskdate,
        projectname,
        object,
        riskname,
        riskcode,
        category,
        severity,
        riskgroup,
        subcategory,
        description,
        owner,
        actionplan,
        assigned,
        status,
        expectedcompletiondate,
        actualcompletiondate,
        complianceimplication,
        fileupload,
        vulnerability,
        threat,
        confidentiality: confidentialitySecondAsset,
        availability: availabilitySecondAsset,
        integrity: integritySecondAsset,
        probability: probabilitySecondAsset,
        impact: impactSecondAsset,
        riskexposure: riskExposureSecondAsset,
        objectname,
        newvalue,
        oldvalue,
        residualrisk: residualRiskSecondAsset,
        controlowner,
        mitigationstrategy,
        contingencystrategy,
        updatedate,
        groupname,
        thrustarea,
        controlname,
        controlwt,
        subcontrolname,
        subcontrolwt,
        remark,
      };

      if (!riskid) {
        axios
          .post(API.ADD_RISK_API, requestData)
          .then(() => {
            setState({ initialState });
          })
          .catch((err) => toast.error(err.response.data));

        toast.success("Risk added successfully");
      } else {
        axios
          .put(API.GET_RISKCATEGORY_API, requestData)
          .then(() => {
            setState({ initialState });
          })
          .catch((err) => toast.error(err.response.data));

        toast.success("Risk Added successfully");
      }

      setTimeout(() => navigate("/riskmanagement"), 500);
    }
  };

  const handleAdditionalFieldsClick = () => {
    setShowAdditionalFields(!showAdditionalFields);
  };
  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    if (name === "controlid") {
      const selectedControl = controlNames.find(
        (control) => control.controlid === value
      );

      console.log("Selected Control:", selectedControl);

      if (selectedControl) {
        const controlUpdates = {
          [name]: value,
          controlwt: selectedControl?.controlwt || "",
          controlname: selectedControl?.controlname || "",
          subcontrolid: selectedControl?.subcontrolid || "",
          subcontrolname: selectedControl?.subcontrolname || "",
          subcontrolwt: selectedControl?.subcontrolwt || "",
          evidence: selectedControl?.evidence || "",
        };

        setState((prevState) => ({
          ...prevState,
          ...controlUpdates,
        }));

        // Check if the selected control has a subcontrolname associated with it
        if (selectedControl?.subcontrolname) {
          // Find the selected subcontrol using the subcontrolname
          const selectedSubControl = subControlNames.find(
            (subcontrol) =>
              subcontrol.subcontrolname === selectedControl.subcontrolname
          );

          console.log("Selected SubControl:", selectedSubControl);

          if (selectedSubControl) {
            const subControlUpdates = {
              subcontrolid: selectedSubControl?.subcontrolid || "",
              subcontrolname: selectedSubControl?.subcontrolname || "",
              subcontrolwt: selectedSubControl?.subcontrolwt || "",
              evidence: selectedSubControl?.evidence || "",
            };

            setState((prevState) => ({
              ...prevState,
              ...subControlUpdates,
            }));
          } else {
            console.error(
              `Selected subcontrol with name ${selectedControl.subcontrolname} not found.`
            );
          }
        } else {
          console.warn(
            "Selected control does not have a subcontrolname associated with it."
          );
        }
      } else {
        console.error(`Selected control with id ${value} not found.`);
      }
    } else {
      setState((prevState) => ({ ...prevState, [name]: value }));
    }

    const { type, checked } = e.target;

    setState((prevState) => {
      const updatedState = {
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      };

      const {
        asset,
        calculateriskexposure,
        confidentiality,
        availability,
        integrity,
        probability,
        impact,
      } = updatedState;

      let riskexposure = 0;

      if (asset) {
        if (calculateriskexposure) {
          riskexposure =
            parseFloat(confidentiality) *
            parseFloat(availability) *
            parseFloat(integrity) *
            parseFloat(probability) *
            parseFloat(impact);
        } else {
          riskexposure =
            parseFloat(confidentiality) *
            parseFloat(availability) *
            parseFloat(integrity);
        }
      } else if (calculateriskexposure) {
        riskexposure = parseFloat(probability) * parseFloat(impact);
      }

      updatedState.riskexposure = riskexposure;
      updatedState.newvalue = riskexposure;
      updatedState.oldvalue = riskexposure;

      if (
        updatedState.secondAsset &&
        updatedState.calculateSecondRiskExposure
      ) {
        const riskExposureSecondAsset =
          parseFloat(updatedState.confidentialitySecondAsset) *
          parseFloat(updatedState.availabilitySecondAsset) *
          parseFloat(updatedState.integritySecondAsset) *
          parseFloat(updatedState.probabilitySecondAsset) *
          parseFloat(updatedState.impactSecondAsset);

        updatedState.riskExposureSecondAsset =
          riskExposureSecondAsset.toString();
      } else if (updatedState.secondAsset) {
        const riskExposureSecondAsset =
          parseFloat(updatedState.confidentialitySecondAsset) *
          parseFloat(updatedState.availabilitySecondAsset) *
          parseFloat(updatedState.integritySecondAsset);
        updatedState.riskExposureSecondAsset =
          riskExposureSecondAsset.toString();
      } else if (updatedState.calculateSecondRiskExposure) {
        const riskExposureSecondAsset =
          parseFloat(updatedState.probabilitySecondAsset) *
          parseFloat(updatedState.impactSecondAsset);
        updatedState.riskExposureSecondAsset =
          riskExposureSecondAsset.toString();
      } else {
        updatedState.riskExposureSecondAsset = "";
      }

      const residualRiskDifference =
        parseFloat(updatedState.riskexposure || 0) -
        parseFloat(updatedState.riskExposureSecondAsset || 0);

      updatedState.residualRiskSecondAsset = residualRiskDifference.toString();

      return updatedState;
    });
  };
  /********************************** */
  const handleInputChangeGroup = (e) => {
    console.log("group called");
    const { name, value } = e.target;
    console.log("value :", value);
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      thrustarea: "", // Reset thrust area when group changes
    }));

    axios
      .get(API.GET_GROUPNAME_SUBCONTROL(value))
      .then((response) => {
        setThrustName(response.data);
      })
      .catch((error) => {
        console.error("An error occurred while fetching thrust areas:", error);
      });
  };

  /****************************** */
  const handleInputChangeThrustArea = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      // Reset control id when thrust area changes
    }));

    axios
      .get(API.GET_THRUST_SUBCONTROL(value))
      .then((response) => {
        setControlNames(response.data);
      })
      .catch((error) => {
        console.error("An error occurred while fetching controls:", error);
      });
  };
  /****************************** */
  return (
    <div>
      <Header />
      <div>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              margin: "20px auto",
              width: "80%",
            }}
          >
            <div style={{ marginLeft: "30px" }}>
              <h1 style={{ marginTop: "2px", marginBottom: "2px" }}>
                <label htmlFor="objecttype">Risk Details</label>
              </h1>
            </div>
          </div>
          <div
            style={{
              marginRight: "50px",
              marginLeft: "50px",
              marginBottom: "5px",
              marginTop: "2px",
              padding: "0px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "10px",
            }}
          >
            <div>
              <label>Organization:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                id="organization"
                name="organization"
                value={organization || ""}
                onChange={handleInputChange}
                disabled={isReadOnly}
              >
                <option value="">Organization </option>
                {organizationComp.map((comp) => (
                  <option key={comp.companyid} value={comp.organization}>
                    {comp.organization}
                  </option>
                ))}
              </select>
              <br />
            </div>
            <div>
              <label> Responsibilty group:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                id="responsibilitygroup"
                name="responsibilitygroup"
                value={state.responsibilitygroup || ""}
                onChange={handleInputChange}
                disabled={isReadOnly}
              >
                <option value="">Responsibilty Group</option>
                {respGroup.map((respgroup) => (
                  <option
                    key={respgroup.responsibilityid}
                    value={respgroup.responsibilitytype}
                  >
                    {respgroup.responsibilitytype}
                  </option>
                ))}
              </select>
              <br />
            </div>
            <div>
              <label> Responsibilty Center:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                id="responsibilitycenter"
                name="responsibilitycenter"
                value={responsibilitycenter || ""}
                onChange={handleInputChange}
                disabled={isReadOnly}
              >
                <option value="">Responsibilty Center</option>
                {respCenter.map((respcenter) => (
                  <option
                    key={respcenter.responsibilitynameid}
                    value={respcenter.responsibilitytype}
                  >
                    {respcenter.responsibilitytype}
                  </option>
                ))}
              </select>
              <br />
            </div>
            <div>
              <label>Date:</label>
              <br />
              <input
                style={{
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  marginTop: "8px",
                  width: "330px",
                  height: "42px",
                  backgroundColor: "#f2f2f9",
                }}
                type="date"
                id="riskdate"
                name="riskdate"
                placeholder="Enter the Date"
                value={riskdate || ""}
                onChange={handleInputChange}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <label>Project:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                type="text"
                id="project"
                name="project"
                placeholder="Enter the Project"
                value={projectname || ""}
                onChange={handleInputChange}
                disabled={isReadOnly}
              >
                {" "}
                <option value="">Project</option>
                {projectName.map((project) => (
                  <option key={project.projectname} value={project.projectname}>
                    {project.projectname}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Object Type:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                id="object"
                name="object"
                value={object}
                onChange={handleInputChange}
                disabled={isReadOnly}
              >
                <option value="">Object Type</option>
                {objectType.map((objtype) => (
                  <option key={objtype.objectid} value={objtype.objecttype}>
                    {objtype.objecttype}
                  </option>
                ))}
              </select>
              <br />
            </div>
            <div>
              <label>Object Name:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                id="objectname"
                name="objectname"
                value={objectname}
                onChange={handleInputChange}
                disabled={isReadOnly}
              >
                <option value="">Object Name</option>
                {objectName.map((objname) => (
                  <option key={objname.nameid} value={objname.objectcode}>
                    {objname.objectcode}
                  </option>
                ))}
              </select>
              <br />
            </div>
            <div>
              <label>Risk Name:</label>
              <input
                style={{ fontFamily: "Poppins" }}
                type="text"
                id="riskname"
                name="riskname"
                placeholder="Enter the Risk Name"
                value={riskname || ""}
                onChange={handleInputChange}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <label>Risk Code:</label>
              <input
                style={{ fontFamily: "Poppins" }}
                type="text"
                id="riskcode"
                name="riskcode"
                placeholder="Enter the risk Code"
                value={riskcode || ""}
                onChange={handleInputChange}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <label>Risk category:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                id="category"
                name="category"
                value={category || ""}
                onChange={handleInputChange}
                disabled={isReadOnly}
              >
                <option value="">Select Risk Category</option>
                {riskCategory.map((riskcateg) => (
                  <option
                    key={riskcateg.riskcategoryid}
                    value={riskcateg.riskcategoryid}
                  >
                    {riskcateg.categoryname}
                  </option>
                ))}
              </select>
            </div>{" "}
            <div>
              <label>Sub Category:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                id="subcategory"
                name="subcategory"
                value={subcategory || ""}
                onChange={handleInputChange}
                disabled={isReadOnly}
              >
                <option value="">Select SubCategory</option>
                {subCategory.map((subcateg) => (
                  <option
                    key={subcateg.subcategorypid}
                    value={subcateg.subcategorytype}
                  >
                    {subcateg.subcategorytype}
                  </option>
                ))}
              </select>
            </div>{" "}
            <div>
              <label>Risk Severity:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                id="severity"
                name="severity"
                value={severity || ""}
                onChange={handleInputChange}
              >
                <option value="">Select Risk Severity</option>
                {riskSeverity.map((riskseverity) => (
                  <option
                    key={riskseverity.riskseverityid}
                    value={riskseverity.riskseverityvalue}
                  >
                    {riskseverity.riskseveritytype}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Risk Group:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                id="riskgroup"
                name="riskgroup"
                value={riskgroup || ""}
                onChange={handleInputChange}
                disabled={isReadOnly}
              >
                <option value="">Select Risk</option>
                {riskNames.map((riskg) => (
                  <option key={riskg.riskgroupid} value={riskg.riskgroupname}>
                    {riskg.riskgroupname}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/**** OLD CAPAI Display***** ***********
           * *
           * *
           * *
           * *
           * *
           * *
           * *
           * *
           */}

          <div
            style={{
              margin: "50px",
              marginTop: "1px",
              marginBottom: "1px",
              paddingTop: "0px",
              padding: "0px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr  ",
              gap: "0px",
            }}
          >
            <div style={{ marginTop: "1px" }}>
              <label>Old Asset:</label>
              <input
                type="checkbox"
                name="secondAsset"
                checked={state.secondAsset}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Calculate Risk Exposure Old:</label>
              <input
                type="checkbox"
                name="calculateSecondRiskExposure"
                checked={state.calculateSecondRiskExposure}
                onChange={handleInputChange}
              />
            </div>
            <label> Old Risk Value :</label>
          </div>

          <div
            className="input-container"
            style={{
              marginRight: "50px",
              marginLeft: "50px",
              marginBottom: "2px",
              marginTop: "1px",
              padding: "0px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
              gap: "20px",
            }}
          >
            <div>
              <label>Confidentiality:</label>
              <input
                type="text"
                id="confidentiality"
                name="confidentiality"
                value={state.confidentiality}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            <div>
              <label>Availability:</label>
              <input
                type="text"
                id="availability"
                name="availabilit"
                value={state.availability}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            <div>
              <label>Integrity:</label>
              <input
                type="text"
                id="integrity"
                name="integrity"
                value={state.integrity}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            <div>
              <label>Probability:</label>
              <input
                type="text"
                id="probability"
                name="probability"
                value={state.probability}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            <div>
              <label>Impact:</label>
              <input
                type="text"
                id="impact"
                name="impact"
                value={state.impact}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label> Risk Exposure:</label>
              <input
                type="text"
                id="riskExposure"
                name="riskExposure"
                value={state.riskexposure || " "}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            <div>
              <label>Residual Value:</label>
              <input
                style={{ fontFamily: "Poppins" }}
                type="text"
                id="residualrisk"
                name="residualRisk"
                value={state.newvalue || " "}
                readOnly
              />
            </div>
          </div>
          {/***
           * *
           * *
           * *
           * *
           * *
           * *
           * *
           * *
           * *
           * *
           * *
           * *
           */}
          <div
            style={{
              margin: "50px",
              marginTop: "1px",
              marginBottom: "1px",
              paddingTop: "0px",
              padding: "0px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr  ",
              gap: "0px",
            }}
          >
            <div style={{ marginTop: "1px" }}>
              <label>
                Asset:
                <input
                  type="checkbox"
                  name="asset"
                  checked={state.asset}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <label>
              Calculate Risk Exposure:
              <input
                type="checkbox"
                name="calculateriskexposure"
                checked={state.calculateriskexposure}
                onChange={handleInputChange}
              />
            </label>
            <label>Risk Value:</label>{" "}
          </div>

          <div
            className="input-container"
            style={{
              marginRight: "50px",
              marginLeft: "50px",
              marginBottom: "2px",
              marginTop: "1px",
              padding: "0px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
              gap: "20px",
            }}
          >
            <div>
              <label>Confidentiality:</label>
              <input
                type="text"
                id="confidentialitySecondAsset"
                name="confidentialitySecondAsset"
                value={state.asset ? state.confidentialitySecondAsset : ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Availability:</label>
              <input
                type="text"
                id="availabilitySecond"
                name="availabilitySecondAsset"
                value={state.asset ? state.availabilitySecondAsset : ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Integrity:</label>
              <input
                type="text"
                id="integritySecond"
                name="integritySecondAsset"
                value={state.asset ? state.integritySecondAsset : ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Probability:</label>
              <input
                type="text"
                id="probabilitySecond"
                name="probabilitySecondAsset"
                value={
                  state.calculateriskexposure
                    ? state.probabilitySecondAsset
                    : ""
                }
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Impact: </label>
              <input
                type="text"
                id="impactSecond"
                name="impactSecondAsset"
                value={
                  state.calculateriskexposure ? state.impactSecondAsset : ""
                }
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label> Risk Exposure:</label>
              <input
                type="text"
                id="riskexposureSecond"
                name="riskexposureSecondAsset"
                value={state.riskExposureSecondAsset || " "}
                onChange={handleInputChange}
                readOnly
              />
            </div>

            <div>
              <label>Residual Value:</label>
              <input
                style={{ fontFamily: "Poppins" }}
                type="text"
                id="residualriskSecond"
                name="residualriskSecondAsset"
                value={state.residualRiskSecondAsset || " "}
                readOnly
              />
            </div>
          </div>
          <div
            style={{
              marginRight: "50px",
              marginLeft: "50px",
              marginBottom: "2px",
              marginTop: "2px",
              padding: "0px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr ",
              gap: "20px",
            }}
          >
            <div>
              <label>Description:</label> <br></br>
              <textarea
                rows="2"
                cols="60"
                style={{
                  fontFamily: "Poppins",
                  marginTop: "9px",
                  backgroundColor: " #f2f2f9",
                }}
                type=""
                id="description"
                name="description"
                placeholder="Enter the Description"
                value={description || ""}
                onChange={handleInputChange}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <label>Risk Owner:</label>
              <input
                style={{ fontFamily: "Poppins" }}
                type="text"
                id="owner"
                name="owner"
                placeholder="Enter the owner"
                value={owner || ""}
                onChange={handleInputChange}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <label>Action Plan:</label>
              <input
                style={{ fontFamily: "Poppins" }}
                type="text"
                id="actionplan"
                name="actionplan"
                placeholder="Enter the Action Plan"
                value={actionplan || ""}
                onChange={handleInputChange}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <label>Assigned:</label>
              <input
                style={{ fontFamily: "Poppins" }}
                type="text"
                id="assigned"
                name="assigned"
                placeholder="Enter the Assigned"
                value={assigned || ""}
                onChange={handleInputChange}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <label>Status:</label>
              <input
                style={{ fontFamily: "Poppins" }}
                type="text"
                id="status"
                name="status"
                placeholder="Enter the Status"
                value={status || ""}
                onChange={handleInputChange}
                disabled={isReadOnly}
              />
            </div>{" "}
            <div>
              <label>Expected Completion Date:</label>
              <input
                style={{
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  marginTop: "8px",
                  width: "330px",
                  height: "42px",
                  backgroundColor: "#f2f2f9",
                }}
                type="date"
                id="expectedcompletiondate"
                name="expectedcompletiondate"
                placeholder="Enter the Expected Completion Date"
                value={expectedcompletiondate || ""}
                onChange={handleInputChange}
              />
            </div>{" "}
            <div>
              <label>Actual Completion Date:</label>
              <input
                style={{
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  margin: "6px",
                  width: "330px",
                  height: "40px",
                  backgroundColor: "#f2f2f9",
                }}
                type="date"
                id="actualcompletiondate"
                name="actualcompletiondate"
                placeholder="Enter the Actual Completion Date"
                value={actualcompletiondate || ""}
                onChange={handleInputChange}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <label>Compliance Implication:</label>
              <input
                style={{ fontFamily: "Poppins" }}
                type="text"
                id="complianceimplication"
                name="complianceimplication"
                placeholder="Enter the Compliance Implication"
                value={complianceimplication || ""}
                onChange={handleInputChange}
                disabled={isReadOnly}
              />
            </div>{" "}
            <div>
              <label> File Upload: </label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <br />
                <input
                  style={{ fontFamily: "Poppins", marginRight: "10px" }}
                  type="text"
                  id="fileupload"
                  name="fileupload"
                  placeholder="Enter the file upload link"
                  value={fileupload || ""}
                  onChange={handleInputChange}
                  disabled={isReadOnly}
                />
                <div style={{ position: "relative" }}></div>
                <a
                  href="https://drive.google.com/drive/folders/1AJ8YN8wgFtDWkPk0YCWYtNok1c2xuQeY?usp=share_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  file Upload here
                </a>
              </div>
            </div>
            <div>
              <label>Vulnerability:</label>
              <br></br>
              <textarea
                rows="2"
                cols="50"
                style={{
                  fontFamily: "Poppins",
                  marginTop: "9px",
                  backgroundColor: "#f2f2f9",
                }}
                type="text"
                id="vulnerability"
                name="vulnerability"
                placeholder="vulnerability"
                value={vulnerability || ""}
                onChange={handleInputChange}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <label>Threat:</label>
              <br></br>
              <textarea
                rows="2"
                cols="50"
                style={{
                  fontFamily: "Poppins",
                  marginTop: "9px",
                  backgroundColor: "#f2f2f9",
                }}
                type="text"
                id=""
                name="threat"
                placeholder="threat"
                value={threat || ""}
                onChange={handleInputChange}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <label>Mitigation Strategy:</label>
              <input
                type="text"
                value={state.mitigationstrategy}
                onChange={handleInputChange}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <label>Contingency Strategy:</label>
              <input
                type="text"
                value={state.contingencystrategy}
                onChange={handleInputChange}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <label>Update Date:</label>
              <br></br>
              <input
                style={{
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  margin: "6px",
                  width: "330px",
                  height: "40px",
                  backgroundColor: "#f2f2f9",
                }}
                type="date"
                id="updatedate"
                name="updatedate"
                placeholder="Enter the Actual Completion Date"
                value={updatedate || ""}
                onChange={handleInputChange}
                disabled={isReadOnly}
              />
            </div>
          </div>
          <center>
            <h1>Governance</h1>
          </center>
          <div
            style={{
              marginRight: "50px",
              marginLeft: "50px",
              marginBottom: "3cm",
              marginTop: "2px",
            }}
          >
            <label>Show Additional Fields:</label>
            <button type="button" onClick={handleAdditionalFieldsClick}>
              {showAdditionalFields ? "-" : "+"}
            </button>
          </div>
          {/************
           *
           *
           *
           *
           *
           *
           * Aditional Features of governance
           *
           *
           *
           *
           *
           *
           *
           */}

          {showAdditionalFields && (
            <div
              style={{
                marginRight: "50px",
                marginLeft: "50px",
                marginBottom: "3cm",
                marginTop: "2px",
                padding: "0px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr ",
                gap: "10px",
              }}
            >
              <div>
                <label>Control Owner:</label>
                <input
                  type="text"
                  id="controlowner"
                  name="controlowner"
                  placeholder="Enter Control Owner"
                  value={controlowner}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Governance Group :</label>
                <select
                  style={{
                    fontFamily: "Poppins",
                    //color: isReadOnly ? "#000000" : "#000000", // Grey for readonly
                    //backgroundColor: isReadOnly ? "#f4f4f4" : "#ffffff", // Background color for readonly
                  }}
                  id="groupname"
                  name="groupname"
                  value={state.groupname || ""}
                  onChange={handleInputChangeGroup}

                  // disabled={isReadOnly} // Disable if in read-only mode
                >
                  <option value="">Select Govenance Group</option>
                  {groupNames.map((group) => (
                    <option key={group.groupid} value={group.groupname}>
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
                    //color: isReadOnly ? "#000000" : "#000000", // Grey for readonly
                    //backgroundColor: isReadOnly ? "#f4f4f4" : "#ffffff", // Background color for readonly
                  }}
                  id="thrustarea"
                  name="thrustarea"
                  value={state.thrustarea || ""}
                  onChange={handleInputChangeThrustArea}

                  // disabled={isReadOnly} // Disable if in read-only mode
                >
                  <option value="">Select Thrust Area</option>
                  {thrustName.map((thrust) => (
                    <option
                      key={thrust.subcontrolid}
                      value={thrust.thrustarea || state.thrustarea || " "}
                    >
                      {thrust.thrustarea}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="controlid">Sub-Control Name:</label>
                <select
                  style={{
                    fontFamily: "Poppins",
                    // color: isReadOnly ? "#000000" : "#000000", // Grey for readonly
                    // backgroundColor: isReadOnly ? "#eee" : "#ffffff", // Background color for readonly
                  }}
                  id="controlid"
                  name="controlid"
                  value={state.controlid || ""} // Use state.controlid instead of state.controlname
                  onChange={handleInputChange} // Ensure handleInputChange is correctly updating state.controlid
                  //disabled={isReadOnly}
                >
                  <option value="">Select Sub-Control Name</option>
                  {controlNames.map((control) => (
                    <option key={control.controlid} value={control.controlid}>
                      {control.subcontrolname}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                {" "}
                <label>Sub-Control Weight : </label>
                <input
                  style={{
                    fontFamily: "Poppins",
                    //color: isReadOnly ? "#000000" : "#000000", // Grey for readonly
                    // backgroundColor: isReadOnly ? "#eee" : "#ffffff", // Background color for readonly
                  }}
                  type="text"
                  id="controlwt"
                  name="controlwt"
                  placeholder="Control Weight"
                  //disabled={isReadOnly}
                  value={state.subcontrolwt || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="subcontrolid">Control Name:</label>
                <input
                  style={{
                    fontFamily: "Poppins",
                    //color: isReadOnly ? "#000000" : "#000000", // Grey for readonly
                    //backgroundColor: isReadOnly ? "#eee" : "#ffffff", // Background color for readonly
                  }}
                  id="subcontrolname"
                  name="subcontrolname"
                  value={state.controlname || ""}
                  onChange={handleInputChange}
                  //disabled={isReadOnly}
                  type="text"
                />
              </div>
              <div>
                <label>Control Weight : </label>
                <input
                  style={{
                    fontFamily: "Poppins",
                    // color: isReadOnly ? "#000000" : "#000000", // Grey for readonly
                    // backgroundColor: isReadOnly ? "#eee" : "#ffffff", // Background color for readonly
                  }}
                  type="text"
                  id="subcontrolwt"
                  name="subcontrolwt"
                  placeholder="Sub-Control Weight"
                  // disabled={isReadOnly}
                  value={state.controlwt || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                {" "}
                <label>Expected Evidence : </label>
                <input
                  style={{
                    fontFamily: "Poppins",
                    //color: isReadOnly ? "#000000" : "#000000", // Grey for readonly
                    // backgroundColor: isReadOnly ? "#eee" : "#ffffff", // Background color for readonly
                  }}
                  type="text"
                  id="evidence"
                  name="evidence"
                  placeholder="Recomended Evidence"
                  //disabled={isReadOnly}
                  value={state.evidence || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Remark:</label>
                <br></br>
                <textarea
                  rows="2"
                  cols="50"
                  style={{
                    fontFamily: "Poppins",
                    marginTop: "9px",
                    backgroundColor: "#f2f2f9",
                  }}
                  id="remark"
                  name="remark"
                  placeholder="Enter Remark"
                  value={remark}
                  onChange={handleInputChange}
                />
              </div>{" "}
              <div style={{ justifyContent: "center", marginTop: "23px" }}>
                <input type="submit" value={"Save"}></input>
              </div>
              <Link to="/riskmanagement"></Link>
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default ControlUpadte;

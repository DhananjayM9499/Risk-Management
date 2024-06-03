import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./TableRisk.css";
import * as API from "../endpoint";
import Footer from "../pages/footer";
import Header from "../pages/header";
import "../pages/file.css"

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
  riskowner: " ",
  actionplan: " ",
  assigned: " ",
  status: " ",
  expectedcompletiondate: " ",
  actualcompletiondate: " ",
  complianceimplication: " ",
  fileupload: " ",
  vulnerability: " ",
  threat: " ",
  asset: false,
  confidentiality: 1,
  availability: 1,
  integrity: 1,
  calculateriskexposure: false,
  probability: 1,
  impact: 1,
  riskexposure: 1,
  objectname: " ",
  riskvalue: " ",
  newvalue: 0,
  oldvalue: 0,
  residualrisk: 0,
  riskowner: " ",
  mitigationstrategy: " ",
  contingencystrategy: " ",
  updatedate: " ",
  risktype: "",
  racitype: "",
  Responsible: " ",
  accountable: " ",
  consulted: " ",
  informed: " ",
  responsible:" ",
  accountable:" ",
  consulted:" ",
  informed:" "
};
const TableRisk = () => {
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
  const [projectName, setProject] = useState([]);
  const [vulnerabilityName, setvulnerability] = useState([]);

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
    asset,
    confidentiality,
    availability,
    integrity,
    calculateriskexposure,
    probability,
    impact,
    riskexposure,
    objectname,
    riskvalue,
    newvalue,
    oldvalue,
    residualrisk,
    riskowner,
    mitigationstrategy,
    contingencystrategy,
    updatedate,
    risktype,
    racitype,
    responsible,
    accountable,
    consulted,
    informed,
    
  } = state;

  console.log(state);
  const [emails, setEmails] = useState({
    responsible: "",
    accountable: "",
    consulted: "",
    informed: "",
    organization: "",
    responsibilitygroup: "",
    responsibilitycenter: "",
    riskdate: "",
    projectname: "",
    object: "",
    riskname: "",
    riskcode: "",
    category: "",
    severity: "",
    riskgroup: "",
    subcategory: "",
    owner: "",
    risktype: "",
    racitype: "",
  });
  var one = emails.responsible;
  var two = emails.accountable;
  var three = emails.consulted;
  var four = emails.informed;
  var organizatio = emails.organization;
  var responsibilitygrou = emails.responsibilitygroup;
  var responsibilitycente = emails.responsibilitycenter;
  var riskdat = emails.riskdate;
  var projec = emails.projectname;
  var objec = emails.object;
  var risknam = emails.riskname;
  var riskcod = emails.riskcode;
  var categor = emails.category;
  var severit = emails.severity;
  var riskgrou = emails.riskgroup;
  var subcategor = emails.subcategory;
  var owne = emails.owner;
  var risktyp = emails.risktype;
  var racityp = emails.racitype;

  const PostEmails = () => {
    var payload = {
      email1: one,
      email2: two,
      email3: three,
      email4: four,
      organization: organizatio,
      responsibilitygroup: responsibilitygrou,
      responsibilitycenter: responsibilitycente,
      riskdate: riskdat,
      projectname: projec,
      object: objec,
      riskname: risknam,
      riskcode: riskcod,
      category: categor,
      severity: severit,
      riskgroup: riskgrou,
      subcategory: subcategor,
      owner: owne,
      risktype: risktyp,
      racitype: racityp,
    };
    console.log(payload);
    axios({
      url: API.RISKMAIL_RISK_API,
      method: "post",
      data: payload,
      constentType: "application/json",
    })
      .then((res) => {
        alert("done");
      })
      .catch((err) => {
        alert("failed");
      });
  };

  const [data, setData] = useState({
    organization: "",
    responsibilitygroup: "",
    responsibilitycenter: "",
    riskdate: "",
    projectname: "",
    object: "",
  });
  console.log(data);

  
  const navigate = useNavigate();

  const { riskid } = useParams();

  useEffect(() => {
    if (riskid) {
      axios.get(API.VIEW_RISK_API(riskid)).then((resp) => {
        const editedData = resp.data[0];
        setState({
          ...editedData,
          asset: true,
          calculateriskexposure: true,
        });
      });
    }

    axios.get(API.GET_RISKGROUP_API).then((resp) => setRisk(resp.data));

    // Replace hard-coded URLs with imported constants
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

    axios
      .get(API.OBJECTGET_OBJECTNAME_API)
      .then((resp) => setObjectName(resp.data));

    axios
      .get(API.GET_COMPANY_API)
      .then((resp) => setOrganizationComp(resp.data));

    axios.get(API.GET_PROJECT_API).then((response) => {
      setProject(response.data);
    });

    axios.get(API.GET_VULNERABILITY_API).then((response) => {
      setvulnerability(response.data);
    });
  }, [riskid]);

  const handlSubmit = (e) => {
    e.preventDefault();
    if (!organization) {
      toast.error("please provider value into each input field");
    } else {
      if (!riskid) {
        axios
          .post(API.ADD_RISK_API, {
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
            asset,
            confidentiality,
            availability,
            integrity,
            calculateriskexposure,
            probability,
            impact,
            riskexposure,
            objectname,
            riskvalue,
            newvalue,
            oldvalue,
            residualrisk,
            riskowner,
            mitigationstrategy,
            contingencystrategy,
            updatedate,
            risktype,
            racitype,
            responsible,
            accountable,
            consulted,
            informed,
            responsible,
            accountable,
            consulted,
            informed
          })
          .then(() => {
            setState({
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
              riskowner: " ",
              actionplan: " ",
              assigned: " ",
              status: " ",
              expectedcompletiondate: " ",
              actualcompletiondate: " ",
              complianceimplication: " ",
              fileupload: " ",
              vulnerability: " ",
              threat: " ",
              asset: " ",
              confidentiality: " ",
              availability: " ",
              integrity: " ",
              calculateriskexposure: " ",
              probability: " ",
              impact: " ",
              riskexposure: " ",
              objectname: " ",
              riskvalue: " ",
              newvalue: " ",
              oldvalue: " ",
              residualrisk: " ",
              riskowner: " ",
              mitigationstrategy: " ",
              contingencystrategy: " ",
              updatedate: " ",
              risktype: "",
              racitype: "",
              responsible: " ",
              accountable: " ",
              consulted: " ",
              informed: " ",
              responsible:" ",
              accountable:" ",
              consulted:" ",
              informed:" "
            });
            PostEmails();
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Risk added successfully");
      } else {
        axios
          .put(API.UPDATE_RISK_API(riskid), {
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
            asset,
            confidentiality,
            availability,
            integrity,
            calculateriskexposure,
            probability,
            impact,
            riskexposure,
            objectname,
            riskvalue,
            newvalue,
            oldvalue,
            residualrisk,
            riskowner,
            mitigationstrategy,
            contingencystrategy,
            updatedate,
            risktype,
            racitype,
            responsible,
            accountable,
            consulted,
            informed,
            
          })
          .then(() => {
            setState({
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
              riskowner: " ",
              actionplan: " ",
              assigned: " ",
              status: " ",
              expectedcompletiondate: " ",
              actualcompletiondate: " ",
              complianceimplication: " ",
              fileupload: " ",
              vulnerability: " ",
              threat: " ",
              asset: " ",
              confidentiality: " ",
              availability: " ",
              integrity: " ",
              calculateriskexposure: " ",
              probability: " ",
              impact: " ",
              riskexposure: " ",
              objectname: " ",
              riskowner: " ",
              riskvalue: " ",
              newvalue: " ",
              oldvalue: " ",
              residualrisk: " ",
              mitigationstrategy: " ",
              contingencystrategy: " ",
              updatedate: " ",
              risktype: "",
              racitype: "",
              responsible: " ",
              accountable: " ",
              informed: " ",
              consulted:" "
            });
          })

          .catch((err) => toast.error(err.response.data));
        toast.success("Risk update successfully");
      }
      PostEmails();
      // SendEmail();
      setTimeout(() => navigate("/riskmanagement"), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setState((prevState) => {
      let newvalue = prevState.riskexposure;
      let residualrisk = prevState.oldvalue;

      setEmails((prevEmails) => ({
        ...prevEmails,
        [name]: value,
      }));
      if (isValidEmail(value)) {
        sendEmail(value);
      }

      // Update the values in the state
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

      // Calculate risk exposure
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

      newvalue = riskexposure;

      // Set oldvalue of the current risk to the newvalue for the next risk
      const updatedStateWithOldValue = {
        ...updatedState,
        newvalue, // Set newvalue
        oldvalue: newvalue, // Set oldvalue to newvalue for the next risk
        riskexposure,
        residualrisk,
      };

      // Return the updated state
      return updatedStateWithOldValue;
    });
  };

  const isValidEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendEmail = (email) => {
    // Here you would implement the email sending functionality
    // For demonstration, let's just log the email to console
    console.log("Sending email to: " + email);
  };

  const handleDataChanges = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <Header />
      <div>
        <button onClick={() => PostEmails()}></button>

        <form onSubmit={handlSubmit}>
          
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", margin: "20px auto", width: "80%" }}>
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
                value={emails.organization || state.organization}
                onChange={handleInputChange}
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
                value={emails.responsibilitygroup || state.responsibilitygroup}
                onChange={handleInputChange}
              >
                <option value="">Responsibilty Group</option>
                {respGroup.map((respgroup) => (
                   <option key={respgroup.responsibilityid}
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
                value={emails.responsibilitycenter || state.responsibilitycenter}
                onChange={handleInputChange}
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
              <br></br>
              <input
                style={{
                  fontFamily: "Poppins",
                  margintop: "1px",
                  fontSize: "16px",
                  margin: "6px",
                  width: "350px",
                  height: "40px",
                  backgroundColor:"#f2f2f9"
                }}
                type="date"
                id="riskdate"
                name="riskdate"
                placeholder="Enter the Date"
                value={emails.riskdate || state.riskdate}
                onChange={handleInputChange}
              />
            </div>{" "}
            <div>
              <label>Project:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                type="text"
                id="projectname"
                name="projectname"
                placeholder="Enter the Project"
                value={emails.projectname || state.projectname}
                onChange={handleInputChange}
              >
                {" "}
                <option value="">Project</option>
                {projectName.map((project) => (
                  <option key={project.projectname} value={project.projectname}>
                    {project.projectname}
                  </option>
                ))}
              </select>
            </div>{" "}
            <div>
              <label>Object Type:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                id="object"
                name="object"
                value={emails.object || state.object}
                onChange={handleInputChange}
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
              />
            </div>
            <div>
              <label>Risk category:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                id="category"
                name="category"
                value={state.category || ""}
                onChange={handleInputChange}
              >
                <option value="">Select Risk Category</option>
                {riskCategory.map((riskcateg) => (
                  <option
                    key={riskcateg.riskcategoryid}
                    value={riskcateg.riskcateyname}
                  >
                    {riskcateg.categoryname}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Sub Category:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                id="subcategory"
                name="subcategory"
                value={subcategory || ""}
                onChange={handleInputChange}
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
            </div>
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
              >
                <option value="">Select Risk Group</option>
                {riskNames.map((riskg) => (
                  <option key={riskg.riskgroupid} value={riskg.riskgroupname}>
                    {riskg.riskgroupname}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Risk Type:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                id="risktype"
                name="risktype"
                onChange={handleInputChange}
                value={state.risktype || " "}
              >
                <option value="">Select Risk Type</option>

                <option value="Cost">Cost Risk</option>
                <option value="Schedule">Schedule Risk</option>
                <option value="Performance">Performance Risk</option>
                <option value="Operational">Operational Risk</option>
                <option value="Technology">Technology Risk</option>
                <option value="Communication">Communication Risk</option>
                <option value="ScopeCreep">Scope Creep Risk</option>
                <option value="SkillsResource">Skills Resource Risk</option>
                <option value="Market">Market Risk</option>
                <option value="Governance">Governance Risk</option>
                <option value="Strategic">Strategic Risk</option>
                <option value="Legal">Legal Risk</option>
                <option value="ExternalHazard">External Hazard Risk</option>
              </select>
            </div>
            <div>
              <label>RACI Type:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                id="racitype"
                name="racitype"
                // value={racitype || ""}
                onChange={handleInputChange}
              >
                <option value="">Select RACI Type</option>

                <option value="Responsible">Responsible</option>
                <option value="Accountable">Accountable</option>
                <option value="Consulted">Consulted</option>
                <option value="Informed">Informed</option>
              </select>
            </div>
            <div>
              <label>Responsible:</label>
              <input
                type="text"
                id="responsible"
                name="responsible"
                value={emails.responsible || state.responsible}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Accountable:</label>
              <input
                type="text"
                id="accountable"
                name="accountable"
                value={emails.accountable || state.accountable}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Consulted:</label>  
              <input
                type="text"
                id="consulted"
                name="consulted"
                value={emails.consulted || state.consulted}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Informed:</label>
              <input
                type="text"
                id="informed"
                name="informed"
                value={emails.informed || state.informed}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ marginTop: "30px", width: "10cm" }}>
              <Link
                to={`/riskChecklist/${riskid}?organization=${organization}&responsibilitycenter=${responsibilitycenter}&objecttype=${object}&responsibilitygroup=${responsibilitygroup}&projectname=${projectname}&riskcode=${riskcode}&object=${objectname}&theme=Risk Monitoring&riskname=${riskname}`}
              >
                <button className="btn btn-contact"> Risk Activity</button>
              </Link>
            </div>
          </div>

          <div
            style={{
              margin: "50px",
              marginTop: "1px",
              marginBottom: "1px",
              paddingTop: "0px",
              padding: "0px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
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
                name="confidentiality"
                value={state.asset ? state.confidentiality : ""}
                onChange={handleInputChange}
                disabled={!state.asset}
              />
            </div>
            <div>
              <label>Availability:</label>
              <input
                type="text"
                name="availability"
                value={state.asset ? state.availability : ""}
                onChange={handleInputChange}
                disabled={!state.asset}
              />
            </div>
            <div>
              <label>Integrity:</label>
              <input
                type="text"
                name="integrity"
                value={state.asset ? state.integrity : ""}
                onChange={handleInputChange}
                disabled={!state.asset}
              />
            </div>
            <div>
              <label>Probability:</label>
              <input
                type="text"
                name="probability"
                value={state.calculateriskexposure ? state.probability : ""}
                onChange={handleInputChange}
                disabled={!state.calculateriskexposure}
              />
            </div>
            <div>
              <label>Impact: </label>
              <input
                type="text"
                name="impact"
                value={state.calculateriskexposure ? state.impact : ""}
                onChange={handleInputChange}
                disabled={!state.calculateriskexposure}
              />
            </div>

            <div>
              <label> Risk Exposure:</label>
              <input
                type="text"
                name="riskexposure"
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
                name="residualrisk"
                value={state.newvalue || " "}
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
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "20px",
            }}
          >
            <div>
              <label>Description:</label>
              <br></br>
              <textarea
                rows="2"
                cols="50"
                style={{ fontFamily: "Poppins", marginTop: "6px" ,backgroundColor:"#f2f2f9"}}
                type="text"
                id="description"
                name="description"
                placeholder="Enter the Description"
                value={description || ""}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Risk Owner:</label>
              <input
                style={{ fontFamily: "Poppins" }}
                type="text"
                id="riskowner"
                name="riskowner"
                placeholder="Enter the owner"
                value={riskowner || ""}
                onChange={handleInputChange}
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
              />
            </div>

            <div>
              <label>Status:</label>
              <select
                style={{ fontFamily: "Poppins" }}
                type="text"
                id="status"
                name="status"
                value={status || ""}
                onChange={handleInputChange}
              >
                <option value="">Select Status</option>
                <option value="Open">Open</option>
                <option value="Discussion">Discussion</option>
                <option value="Controlled">Controlled</option>
                <option value="Under Observation">Under Observation</option>
                <option value="Closed">Closed</option>
              </select>
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
              />
            </div>

            <div>
              <label> File Upload: </label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <br />
                <input
                  style={{ fontFamily: "Poppins", marginRight: "10px" ,backgroundColor:"#f2f2f9"}}
                  type="text"
                  id="fileupload"
                  name="fileupload"
                  placeholder="Enter the file upload link"
                  value={fileupload || ""}
                  onChange={handleInputChange}
                />
                <div style={{ position: "relative" }}></div>
                <a
                  href="http://drive.google.com/drive/folders/1AJ8YN8wgFtDWkPk0YCWYtNok1c2xuQeY?usp=share_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  file Upload here
                </a>
              </div>
            </div>

            <div>
              <label>Vulnerability:</label>
              <select
                style={{ fontFamily: "Poppins", marginTop: "9px" }}
                type="text"
                id="vulnerability"
                name="vulnerability"
                placeholder="vulnerability"
                value={vulnerability || ""}
                onChange={handleInputChange}
              >
                <option value="">Select Vulnerability</option>
                {vulnerabilityName.map((vulnerability) => (
                  <option
                    key={vulnerability.vulnerabilityid}
                    value={vulnerability.vulnerabilityname}
                  >
                    {vulnerability.vulnerabilityname}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Threat:</label>
              <br></br>
              <textarea
                rows="2"
                cols="50"
                style={{ fontFamily: "Poppins", marginTop: "6px" ,backgroundColor:"#f2f2f9"}}
                type="text"
                id=""
                name="threat"
                placeholder="threat"
                value={threat || ""}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Mitigation Strategy:</label>
              <input
                style={{ fontFamily: "Poppins" }}
                type="text"
                id="mitigationstrategy"
                name="mitigationstrategy"
                value={mitigationstrategy || " "}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Contingency Strategy:</label>
              <input
                type="text"
                id="contingencystrategy"
                name="contingencystrategy"
                value={contingencystrategy || " "}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Expected Completion Date:</label>
              <input
                style={{
                  fontFamily: "Poppins",
                  margintop: "1px",
                  fontSize: "16px",
                  margin: "6px",
                  width: "300px",
                  height: "40px",
                  backgroundColor:" #f2f2f9"
                                }}
                type="date"
                id="expectedcompletiondate"
                name="expectedcompletiondate"
                placeholder="Enter the Expected Completion Date"
                value={expectedcompletiondate || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Actual Completion Date:</label>
              <input
                style={{
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  margin: "6px",
                  width: "330px",
                  height: "40px",
                  backgroundColor:"#f2f2f9"
                }}
                type="date"
                id="actualcompletiondate"
                name="actualcompletiondate"
                placeholder="Enter the Actual Completion Date"
                value={actualcompletiondate || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Update Date:</label>
              <input
                style={{
                  fontFamily: "Poppins",
                  fontSize: "16px",
                  margin: "6px",
                  width: "330px",
                  height: "40px",
                  marginBottom: "100px",
                  backgroundColor:"#f2f2f9"
                }}
                type="date"
                id="updatedate"
                name="updatedate"
                placeholder="Enter the Actual Completion Date"
                value={state.updatedate || ""}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ justifyContent: "center", marginTop: "23px" }}>
              <input type="submit" value={riskid ? "Update" : "Save"}></input>
            </div>
            <Link to="/riskmanagement"></Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default TableRisk;

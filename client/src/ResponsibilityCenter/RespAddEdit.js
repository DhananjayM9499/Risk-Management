import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import * as API from "../endpoint";
const initialState = {
  responsibilitytype: " ",
  responsibilitycode: " ",
  responsibilitydescription: " ",
  dependentresponsibilitycode: " ",
  iconupload: " ",
  fileupload: " ",
};

const RespAddEdit = () => {
  const [state, setState] = useState(initialState);

  const {
    responsibilitytype,
    responsibilitycode,
    responsibilitydescription,
    dependentresponsibilitycode,
    iconupload,
    fileupload,
  } = state;

  const navigate = useNavigate();

  const { responsibilitynameid } = useParams();

  useEffect(() => {
    if (responsibilitynameid) {
      axios
        .get(API.VIEW_RESPONSIBILITYCENTER_API(responsibilitynameid))
        .then((resp) => setState({ ...resp.data[0] }));
    }
  }, [responsibilitynameid]);

  const handlSubmit = (e) => {
    e.preventDefault();
    if (
      !responsibilitytype ||
      !responsibilitycode ||
      !responsibilitydescription ||
      !dependentresponsibilitycode ||
      !iconupload ||
      !fileupload
    ) {
      toast.error("please provider value into each input field");
    } else {
      if (!responsibilitynameid) {
        axios
          .post(API.ADD_RESPONSIBILITYCENTER_API, {
            responsibilitytype,
            responsibilitycode,
            responsibilitydescription,
            dependentresponsibilitycode,
            iconupload,
            fileupload,
          })
          .then(() => {
            setState({
              responsibilitytype: " ",
              responsibilitycode: " ",
              responsibilitydescription: " ",
              dependentresponsibilitycode: " ",
              iconupload: " ",
              fileupload: " ",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Responsibility added successfully");
      } else {
        axios
          .put(API.UPDATE_RESPONSIBILITYCENTER_API(responsibilitynameid), {
            responsibilitytype,
            responsibilitycode,
            responsibilitydescription,
            dependentresponsibilitycode,
            iconupload,
            fileupload,
          })
          .then(() => {
            setState({
              responsibilitytype: " ",
              responsibilitycode: " ",
              responsibilitydescription: " ",
              dependentresponsibilitycode: " ",
              iconupload: " ",
              fileupload: " ",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("responsibitity update successfully");
      }
      setTimeout(() => navigate("/resp2"), 500);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div style={{ marginTop: " 100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "600px",
          alignContent: "center",
        }}
        onSubmit={handlSubmit}
      >
        <label htmlFor="responsibilitytype">Responsibility Type</label>
        <input
          type="text"
          id="responsibilitytype"
          name="responsibilitytype"
          placeholder="Enter Object Type"
          value={responsibilitytype || " "}
          onChange={handleInputChange}
        />

        <label htmlFor="responsibilitycode">Responsibility code</label>
        <input
          type="text"
          id="responsibilitycode"
          name="responsibilitycode"
          placeholder="Enter Object code"
          value={responsibilitycode || " "}
          onChange={handleInputChange}
        />

        <label htmlFor="responsibilitydescription">
          Responsibility Type Description
        </label>
        <input
          type="text"
          id="responsibilitydescription"
          name="responsibilitydescription"
          placeholder="Enter Object Type Description"
          value={responsibilitydescription || " "}
          onChange={handleInputChange}
        />

        <label htmlFor="dependentresponsibilitycode">
          dependent Responsibility code
        </label>
        <input
          type="text"
          id="dependentresponsibilitycode"
          name="dependentresponsibilitycode"
          placeholder="Enter Object Type"
          value={dependentresponsibilitycode || " "}
          onChange={handleInputChange}
        />

        <label htmlFor="iconupload">Icon Upload</label>
        <input
          type="text"
          id="iconupload"
          name="iconupload"
          placeholder="Enter your Icon upload Link"
          value={iconupload || " "}
          onChange={handleInputChange}
        />
        <label htmlFor="fileupload">File Upload</label>
        <input
          type="text"
          id="fileupload"
          name="fileupload"
          placeholder="Enter your file upload link"
          value={fileupload || " "}
          onChange={handleInputChange}
        />
        <input type="submit" value={responsibilitynameid ? "update" : "Save"} />
        <Link to="/resp2">
          <input type="button" value="go back" />
        </Link>
      </form>
    </div>
  );
};

export default RespAddEdit;

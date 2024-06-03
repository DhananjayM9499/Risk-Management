import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import * as API from "../endpoint";

const initialState = {
  objecttype: " ",
  objectcode: " ",
  objectdescription: " ",
  dependentobjectcode: " ",
  iconupload: " ",
  fileupload: " ",
};

const AddEditSecond = () => {
  const [state, setState] = useState(initialState);

  const {
    objecttype,
    objectcode,
    objectdescription,
    dependentobjectcode,
    iconupload,
    fileupload,
  } = state;

  const navigate = useNavigate();

  const { nameid } = useParams();

  useEffect(() => {
    if (nameid) {
      axios
        .get(API.OBJECTVIEW_OBJECTNAME_API(nameid))
        .then((resp) => setState({ ...resp.data[0] }));
    }
  }, [nameid]);

  const handlSubmit = (e) => {
    e.preventDefault();
    if (
      !objecttype ||
      !objectcode ||
      !objectdescription ||
      !dependentobjectcode ||
      !iconupload ||
      !fileupload
    ) {
      toast.error("please provider value into each input field");
    } else {
      if (!nameid) {
        axios
          .post(API.OBJECTADD_OBJECTNAME_API, {
            objecttype,
            objectcode,
            objectdescription,
            dependentobjectcode,
            iconupload,
            fileupload,
          })
          .then(() => {
            setState({
              objecttype: " ",
              objectcode: " ",
              objectdescription: " ",
              dependentobjectcode: " ",
              iconupload: " ",
              fileupload: " ",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Object added successfully");
      } else {
        axios
          .put(API.OBJECTUPDATE_OBJECTNAME_API(nameid), {
            objecttype,
            objectcode,
            objectdescription,
            dependentobjectcode,
            iconupload,
            fileupload,
          })
          .then(() => {
            setState({
              objecttype: " ",
              objectcode: " ",
              objectdescription: " ",
              dependentobjectcode: " ",
              iconupload: " ",
              fileupload: " ",
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Object update successfully");
      }
      setTimeout(() => navigate("/secondTable"), 500);
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
        <label htmlFor="objecttype">Object Type</label>
        <input
          type="text"
          id="objecttype"
          name="objecttype"
          placeholder="Enter Object Type"
          value={objecttype || " "}
          onChange={handleInputChange}
        />

        <label htmlFor="objectcode">Object code</label>
        <input
          type="text"
          id="objectcode"
          name="objectcode"
          placeholder="Enter Object code"
          value={objectcode || " "}
          onChange={handleInputChange}
        />

        <label htmlFor="objectdescription">Object Type Description</label>
        <input
          type="text"
          id="objectdescription"
          name="objectdescription"
          placeholder="Enter Object Type Description"
          value={objectdescription || " "}
          onChange={handleInputChange}
        />

        <label htmlFor="dependentobjectcode">dependent object code</label>
        <input
          type="text"
          id="dependentobjectcode"
          name="dependentobjectcode"
          placeholder="Enter Object Type"
          value={dependentobjectcode || " "}
          onChange={handleInputChange}
        />

        <label>Icon Upload: </label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <br />
          <input
            style={{ fontFamily: "Poppins", marginRight: "10px" }}
            type="text"
            id="iconupload"
            name="iconupload"
            value={state.iconupload || ""}
            onChange={handleInputChange}
          />
          <div style={{ position: "relative" }}></div>
          <a
            href="http://drive.google.com/drive/folders/1AJ8YN8wgFtDWkPk0YCWYtNok1c2xuQeY?usp=share_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            icon file here
          </a>
        </div>

        <label>File Upload: </label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <br />
          <input
            style={{ fontFamily: "Poppins", marginRight: "10px" }}
            type="text"
            id="fileupload"
            name="Fileupload"
            value={state.fileupload || ""}
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
        <input type="submit" value={nameid ? "update" : "Save"} />
        <Link to="/secondTable">
          <input type="button" value="go back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEditSecond;

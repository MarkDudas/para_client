import "./AddLicence.css"
import axios from "axios";
import { useState } from "react";
import AuthZustand from "../../zustand/AuthZustand";
import moment from "moment";
import { months, years } from "../../utilities/Utilities";
// import toast from "react-hot-toast";

interface Prop {
  toggleCloseAddLicense: () => void;
}

const AddLicense = ({ toggleCloseAddLicense }: Prop) => {
  const user = AuthZustand((state) => state.user);
  const [licenseName, setLicenseName] = useState<string>("");
  const [issueingOrg, setIssueingOrg] = useState<string>("");
  const [issueDate, setIssueDate] = useState({
    month: moment(new Date()).format("MM"),
    year: moment(new Date()).format("YYYY"),
  });
  const [description, setDescription] = useState<string>("");

  const handleSaveLicense = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/license/create`,
        {
          email: user,
          licenseName: licenseName,
          issueingOrg: issueingOrg,
          issueDateMonth: issueDate.month,
          issueDateYear: issueDate.year,
          description: description,
        }
      );
      // toast.success("Successful Added License/Certificate!");
      // setTimeout(() => {
      //
      // }, 3000);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-career">
      <h1>Add License</h1>
      <p>
        Showcase your licences, certificates, membership, and accreditations
      </p>
      <div className="add-career-container">
        <label>License/Certificate Name:</label>
        <input
          type="text"
          value={licenseName}
          onChange={(e) => setLicenseName(e.target.value)}
        />

        <label>Issueing organisation (optional):</label>
        <input
          type="text"
          value={issueingOrg}
          onChange={(e) => setIssueingOrg(e.target.value)}
        />

        <label>Issue Date (optional): </label>
        <div className="add-career-date-container">
          <select
            name="startedDateMonth"
            value={issueDate.month}
            onChange={(e) =>
              setIssueDate({ ...issueDate, month: e.target.value })
            }
          >
            {months.map((month, key) => (
              <option key={key} value={month}>
                {month}
              </option>
            ))}
          </select>
          <select
            name="startedDateYear"
            value={issueDate.year}
            onChange={(e) =>
              setIssueDate({ ...issueDate, year: e.target.value })
            }
          >
            {years.map((year, key) => (
              <option key={key} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <label>Description: </label>
        <p style={{ margin: "0", padding: "0" }}>
          Briefly describe this credential - you can also type URL if applicable
        </p>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <button className="save-button" onClick={handleSaveLicense}>Save</button>
        <button className="cancel-button" onClick={toggleCloseAddLicense}>Cancel</button>
      </div>
    </div>
  );
};

export default AddLicense;

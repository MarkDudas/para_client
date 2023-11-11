import "./AddCareer.css";
import { useState } from "react";
import moment from "moment";
import axios from "axios";
import AuthZustand from "../../zustand/AuthZustand";
import { months, years } from "../../utilities/Utilities";

interface Prop {
  toggleCloseAddCareer: () => void;
}

const AddCareer = ({ toggleCloseAddCareer }: Prop) => {
  const user = AuthZustand((state) => state.user);

  const [jobTitle, setJobTitle] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [startedDate, setStartedDate] = useState({
    month: moment(new Date()).format("MM"),
    year: moment(new Date()).format("YYYY"),
  });
  const [endedDate, setEndedDate] = useState({
    month: moment(new Date()).format("MM"),
    year: moment(new Date()).format("YYYY"),
  });
  const [description, setDescription] = useState<string>("");

  const handleSaveCareer = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/career/create`,
        {
          email: user,
          jobTitle: jobTitle,
          companyName: companyName,
          startedDateMonth: startedDate.month,
          startedDateYear: startedDate.year,
          endedDateMonth: endedDate.month,
          endedDateYear: endedDate.year,
          description: description,
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-career">
      <h1>Add Career</h1>
      <div className="add-career-container">
        <label>Job Title:</label>
        <input
          type="text"
          name="jobTitle"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />

        <label>Company Name:</label>
        <input
          type="text"
          name="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <label>Started Date: </label>
        <div className="add-career-date-container">
          <select
            name="startedDateMonth"
            value={startedDate.month}
            onChange={(e) =>
              setStartedDate({ ...startedDate, month: e.target.value })
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
            value={startedDate.year}
            onChange={(e) =>
              setStartedDate({ ...startedDate, year: e.target.value })
            }
          >
            {years.map((year, key) => (
              <option key={key} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <label>End Date:</label>
        <div className="add-career-date-container">
          <select
            name="startedDateMonth"
            value={endedDate.month}
            onChange={(e) =>
              setEndedDate({ ...endedDate, month: e.target.value })
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
            value={endedDate.year}
            onChange={(e) =>
              setEndedDate({ ...endedDate, year: e.target.value })
            }
          >
            {years.map((year, key) => (
              <option key={key} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <button className="save-button" onClick={handleSaveCareer}>Save</button>
        <button className="cancel-button " onClick={toggleCloseAddCareer}>Cancel</button>
      </div>
    </div>
  );
};

export default AddCareer;

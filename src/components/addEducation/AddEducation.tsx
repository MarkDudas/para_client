import "./AddEducation.css"
import { useState } from "react";
import moment from "moment";
import axios from "axios";
import AuthZustand from "../../zustand/AuthZustand";

interface Prop {
  toggleCloseAddEducation: () => void;
}

const years = Array.from(
  { length: new Date().getFullYear() - 1950 + 1 },
  (_, index) => 1950 + index
);

const AddEducation = ({ toggleCloseAddEducation }: Prop) => {
  const user = AuthZustand((state) => state.user);

  const [school, setSchool] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [yearCompleted, setYearCompleted] = useState(
    moment(new Date()).format("YYYY")
  );
  const [courseHighlight, setCourseHighlight] = useState<string>("");

  const handleSaveEducation = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/education/create`,
        {
          email: user,
          school: school,
          course: course,
          yearCompleted: yearCompleted,
          courseHighlight: courseHighlight,
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-career">
      <h1>Add Education</h1>
      <div className="add-career-container">
        <label>School or Institution:</label>
        <input
          type="text"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />

        <label>Course or Qualification:</label>
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <label>Year Completed or Expected finish: </label>
        <select
          value={yearCompleted}
          onChange={(e) => setYearCompleted(e.target.value)}
        >
          {years.map((year, key) => (
            <option key={key} value={year}>
              {year}
            </option>
          ))}
        </select>

        <label>Course Higlight:</label>
        <p>
          Add activities, projects, awards or achievements during your study.
        </p>
        <textarea
          name="description"
          value={courseHighlight}
          onChange={(e) => setCourseHighlight(e.target.value)}
        />
      </div>
      <div>
        <button className="save-button" onClick={handleSaveEducation}>Save</button>
        <button className="cancel-button"onClick={toggleCloseAddEducation}>Cancel</button>
      </div>
    </div>
  );
};

export default AddEducation;

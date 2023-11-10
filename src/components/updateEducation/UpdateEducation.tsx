import { useState } from "react";
import axios from "axios";
import AuthZustand from "../../zustand/AuthZustand";
import { IEducation } from "../../types/Types";
import { useQuery } from "@tanstack/react-query";

interface Prop {
  toggleCloseAddEducation: () => void;
  id: string;
}

const years = Array.from(
  { length: new Date().getFullYear() - 1950 + 1 },
  (_, index) => 1950 + index
);

const UpdateEducation = ({ toggleCloseAddEducation, id }: Prop) => {
  const user = AuthZustand((state) => state.user);

  const { data } = useQuery<IEducation | undefined>({
    queryKey: ["UpdateEducation"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/education/single/${id}`)
        .then((res) => res.data),
  });

  const [school, setSchool] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [yearCompleted, setYearCompleted] = useState(data?.yearCompleted);
  const [courseHighlight, setCourseHighlight] = useState<string>("");

  const handleSaveEducation = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/education/update/${id}`,
        {
          email: user,
          school: school ? school : data?.school,
          course: course ? course : data?.course,
          yearCompleted: yearCompleted,
          courseHighlight: courseHighlight
            ? courseHighlight
            : data?.courseHighlight,
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/education/delete/${id}`
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-career">
      <h1>Update Education</h1>
      <div className="add-career-container">
        <label>School or Institution:</label>
        <input
          type="text"
          defaultValue={data?.school}
          onChange={(e) => setSchool(e.target.value)}
        />

        <label>Course or Qualification:</label>
        <input
          type="text"
          defaultValue={data?.course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <label>Year Completed or Expected finish: </label>
        <select
          defaultValue={data?.yearCompleted}
          onChange={(e) => setYearCompleted(e.target.value)}
        >
          {years.map((year, key) => (
            <option key={key} value={year}>
              {year}
            </option>
          ))}
        </select>

        <label>
          Course Higlight (Add activities, projects, awards or achievements
          during your study):
        </label>

        <textarea
          name="courseHighlight"
          defaultValue={data?.courseHighlight}
          onChange={(e) => setCourseHighlight(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "20px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={handleSaveEducation}
            style={{
              padding: "10px",
              width: "100px",
              border: "none",
            }}
          >
            Update
          </button>
          <button
            style={{
              padding: "10px",
              width: "100px",
              border: "none",
            }}
            onClick={toggleCloseAddEducation}
          >
            Cancel
          </button>
        </div>
        <button
          style={{
            padding: "10px",
            width: "100px",
            border: "none",
            backgroundColor: "red",
            color: "white",
          }}
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UpdateEducation;

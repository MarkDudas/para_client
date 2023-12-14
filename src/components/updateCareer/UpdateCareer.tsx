import { useState } from "react";
import axios from "axios";
import AuthZustand from "../../zustand/AuthZustand";
import { months, years } from "../../utilities/Utilities";
import { useQuery } from "@tanstack/react-query";
import { ICareerHistory } from "../../types/Types";

interface Prop {
  toggleCloseAddCareer: () => void;
  id: string;
}

const UpdateCareer = ({ toggleCloseAddCareer, id }: Prop) => {
  const user = AuthZustand((state) => state.user);

  const { data } = useQuery<ICareerHistory | undefined>({
    queryKey: ["UpdateCareer"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/career/single/${id}`)
        .then((res) => res.data),
  });

  const [jobTitle, setJobTitle] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [startedDate, setStartedDate] = useState({
    month: data?.startedDateMonth,
    year: data?.startedDateYear,
  });
  const [endedDate, setEndedDate] = useState({
    month: data?.endedDateMonth,
    year: data?.endedDateYear,
  });
  const [description, setDescription] = useState<string>("");

  const handleSaveCareer = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/career/update/${id}`,
        {
          updatedBy: user,
          jobTitle: jobTitle ? jobTitle : data?.jobTitle,
          companyName: companyName ? companyName : data?.companyName,
          startedDateMonth: startedDate.month,
          startedDateYear: startedDate.year,
          endedDateMonth: endedDate.month,
          endedDateYear: endedDate.year,
          description: description ? description : data?.description,
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
        `${import.meta.env.VITE_APP_API_URL}/api/career/delete/${id}`
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-career">
      <h1>Update Career</h1>
      <div className="add-career-container">
        <label>Job Title:</label>
        <input
          type="text"
          name="jobTitle"
          defaultValue={data?.jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />

        <label>Company Name:</label>
        <input
          type="text"
          name="companyName"
          defaultValue={data?.companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <label>Started Date: </label>
        <div className="add-career-date-container">
          <select
            name="startedDateMonth"
            defaultValue={startedDate.month}
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
            defaultValue={startedDate.year}
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
            defaultValue={endedDate.month}
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
            defaultValue={endedDate.year}
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
          defaultValue={data?.description}
          onChange={(e) => setDescription(e.target.value)}
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
            onClick={handleSaveCareer}
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
            onClick={toggleCloseAddCareer}
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

export default UpdateCareer;

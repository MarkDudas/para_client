import axios from "axios";
import { useState } from "react";
import AuthZustand from "../../zustand/AuthZustand";

import { months, years } from "../../utilities/Utilities";
// import toast from "react-hot-toast";
import { ILicense } from "../../types/Types";
import { useQuery } from "@tanstack/react-query";

interface Prop {
  toggleCloseAddLicense: () => void;
  id: string;
}

const UpdateLicense = ({ toggleCloseAddLicense, id }: Prop) => {
  const user = AuthZustand((state) => state.user);

  const { data } = useQuery<ILicense | undefined>({
    queryKey: ["UpdateLicense"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/license/single/${id}`)
        .then((res) => res.data),
  });

  const [licenseName, setLicenseName] = useState<string>("");
  const [issueingOrg, setIssueingOrg] = useState<string>("");
  const [issueDate, setIssueDate] = useState({
    month: data?.issueDateMonth,
    year: data?.issueDateYear,
  });
  const [description, setDescription] = useState<string>("");

  const handleSaveLicense = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/license/update/${id}`,
        {
          email: user,
          licenseName: licenseName ? licenseName : data?.licenseName,
          issueingOrg: issueingOrg ? issueingOrg : data?.issueingOrg,
          issueDateMonth: issueDate.month,
          issueDateYear: issueDate.year,
          description: description ? description : data?.description,
        }
      );
      //   toast.success("Successful Added License/Certificate!");
      //   setTimeout(() => {

      //   }, 3000);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/license/delete/${id}`
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-career">
      <h1>Update License</h1>
      <p>
        Showcase your licences, certificates, membership, and accreditations
      </p>
      <div className="add-career-container">
        <label>License/Certificate Name:</label>
        <input
          type="text"
          defaultValue={data?.licenseName}
          onChange={(e) => setLicenseName(e.target.value)}
        />

        <label>Issueing organisation (optional):</label>
        <input
          type="text"
          defaultValue={data?.issueingOrg}
          onChange={(e) => setIssueingOrg(e.target.value)}
        />

        <label>Issue Date (optional): </label>
        <div className="add-career-date-container">
          <select
            name="issueDateMonth"
            defaultValue={data?.issueDateMonth}
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
            name="issueDateYear"
            defaultValue={data?.issueDateYear}
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
            onClick={handleSaveLicense}
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
            onClick={toggleCloseAddLicense}
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

export default UpdateLicense;

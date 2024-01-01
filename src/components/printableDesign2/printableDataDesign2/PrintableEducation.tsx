import "./PrintableData.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AuthZustand from "../../../zustand/AuthZustand";
import { IEducation } from "../../../types/Types";
import { Remove } from "@mui/icons-material";

const PrintableEducation = () => {
  const user = AuthZustand((state) => state.user);
  const { data } = useQuery<IEducation[]>({
    queryKey: ["Education"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/education/${user}`)
        .then((res) => res.data),
  });

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="printableData">
      {data?.map((item, key) => (
        <div key={key}>
          <h3 className="license-info-title">{item.course}</h3>
          <div className="license-info-container">
            <span className="license-info-item">{item.school}</span>
            <span className="printableDesign2-date-duration">
              {item.yearCompleted}
            </span>
            <span className="printableDesign2-description">
              <Remove sx={{ color: "#fcc203", fontSize: "12px" }} />{" "}
              {item.courseHighlight}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrintableEducation;

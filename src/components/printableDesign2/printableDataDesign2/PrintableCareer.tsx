import "./PrintableData.css";
import axios from "axios";
import { ICareerHistory } from "../../../types/Types";
import { useQuery } from "@tanstack/react-query";
import AuthZustand from "../../../zustand/AuthZustand";
import { Remove } from "@mui/icons-material";

const PrintableCareer = () => {
  const user = AuthZustand((state) => state.user);

  const { data } = useQuery<ICareerHistory[] | undefined>({
    queryKey: ["PrintableCareer"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/career/${user}`)
        .then((res) => res.data),
  });

  if (!data || data.length === 0) {
    return null;
  }
  return (
    <div className="printableData">
      {data?.map((item, key) => (
        <div key={key}>
          <h3 className="printableDesign2-jobTitle">{item.jobTitle}</h3>
          <div className="license-info-container">
            <span className="printableDesign2-companyName">
              {item.companyName}
            </span>
            <span className="printableDesign2-date-duration">
              {item.startedDateMonth} {item.startedDateYear} -{" "}
              {item.endedDateMonth} {item.endedDateYear}
            </span>
            <span className="printableDesign2-description">
              <Remove sx={{ color: "#fcc203", fontSize: "12px" }} />{" "}
              {item.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrintableCareer;

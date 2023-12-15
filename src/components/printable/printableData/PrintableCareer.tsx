import axios from "axios";
import { ICareerHistory } from "../../../types/Types";
import { useQuery } from "@tanstack/react-query";
import AuthZustand from "../../../zustand/AuthZustand";
import { Circle, Remove } from "@mui/icons-material";

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
    <div>
      {data?.map((item, key) => (
        <div key={key}>
          <h3 className="license-info-title">
            <Circle />
            {item.jobTitle}
          </h3>
          <div className="license-info-container">
            <span className="license-info-item">
              <Remove />
              {item.companyName}
            </span>
            <span className="license-info-item">
              <Remove />
              {item.startedDateMonth} {item.startedDateYear} -{" "}
              {item.endedDateMonth} {item.endedDateYear}
            </span>
            <span className="license-info-item">
              <Remove />
              {item.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrintableCareer;

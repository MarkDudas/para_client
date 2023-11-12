import "./PrintableData.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AuthZustand from "../../../zustand/AuthZustand";
import { IEducation } from "../../../types/Types";
import { Circle, Remove } from "@mui/icons-material";

const PrintableEducation = () => {
  const user = AuthZustand((state) => state.user);
  const { data } = useQuery<IEducation[]>({
    queryKey: ["Education"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/education/${user}`)
        .then((res) => res.data),
  });
  
  // Check if data is not null or empty
  if (!data || data.length === 0) {
    return null; // or display a message indicating no education data
  }

  return (
    <div>
      {data?.map((item, key) => (
        <div key={key}>
          <h3 className="license-info-title">
            <Circle />
            {item.course}
          </h3>
          <div className="license-info-container">
            <span className="license-info-item">
              <Remove />
              {item.school}
            </span>
            <span className="license-info-item">
              <Remove />
              {item.yearCompleted}
            </span>
            <span className="license-info-item">
              <Remove />
              {item.courseHighlight}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrintableEducation;

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import "./PrintableData.css";
import AuthZustand from "../../../zustand/AuthZustand";
import { ISkills } from "../../../types/Types";
import { Circle } from "@mui/icons-material";

const PrintableSkills = () => {
  const user = AuthZustand((state) => state.user);

  const { data } = useQuery<ISkills[]>({
    queryKey: ["PrintableSkills"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/skill/${user}`)
        .then((res) => res.data),
  });
  
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="printable-skills">
      {data?.map((item) => (
        <div className="printable-skills-container">
          <Circle /> {item.skill}
        </div>
      ))}
    </div>
  );
};

export default PrintableSkills;

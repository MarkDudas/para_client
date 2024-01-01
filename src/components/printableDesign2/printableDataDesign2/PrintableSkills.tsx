import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import "./PrintableData.css";
import AuthZustand from "../../../zustand/AuthZustand";
import { ISkills } from "../../../types/Types";

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
    <div style={{ width: "90%" }}>
      {data?.map((item) => (
        <div className="printableData-skills-container">{item.skill}</div>
      ))}
    </div>
  );
};

export default PrintableSkills;

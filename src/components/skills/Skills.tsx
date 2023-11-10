import axios from "axios";
import { ISkills } from "../../types/Types";
import AuthZustand from "../../zustand/AuthZustand";
import { useQuery } from "@tanstack/react-query";
import "./Skills.css";
import { Delete } from "@mui/icons-material";

const Skills = () => {
  const user = AuthZustand((state) => state.user);

  const { data } = useQuery<ISkills[]>({
    queryKey: ["Skills"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/skill/${user}`)
        .then((res) => res.data),
  });

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/skill/delete/${id}`
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="skills">
      <div className="grid-container">
        {data?.map((item, key) => (
          <div className="skill-item" key={key}>
            {item.skill}
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                width: "20px",
                height: "20px",
              }}
              onClick={() => handleDelete(item._id)}
            >
              <Delete
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  cursor: "pointer",
                }}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;

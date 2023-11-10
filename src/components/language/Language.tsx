import axios from "axios";
import AuthZustand from "../../zustand/AuthZustand";
import { ILanguage } from "../../types/Types";
import { useQuery } from "@tanstack/react-query";
import { Delete } from "@mui/icons-material";

const Language = () => {
  const user = AuthZustand((state) => state.user);

  const { data } = useQuery<ILanguage[]>({
    queryKey: ["Language"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/language/${user}`)
        .then((res) => res.data),
  });

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/language/delete/${id}`
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
            {item.language}
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

export default Language;

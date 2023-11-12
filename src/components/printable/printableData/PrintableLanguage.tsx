import axios from "axios";
import { ILanguage } from "../../../types/Types";
import AuthZustand from "../../../zustand/AuthZustand";
import { useQuery } from "@tanstack/react-query";
import { Circle } from "@mui/icons-material";

const PrintableLanguage = () => {
  const user = AuthZustand((state) => state.user);

  const { data } = useQuery<ILanguage[]>({
    queryKey: ["PrintableLanguage"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/language/${user}`)
        .then((res) => res.data),
  });
  if (!data || data.length === 0) {
    return null;
  }
  return (
    <div className="printable-skills">
      {data?.map((item) => (
        <div className="printable-language-container">
          <Circle /> {item.language}
        </div>
      ))}
    </div>
  );
};

export default PrintableLanguage;

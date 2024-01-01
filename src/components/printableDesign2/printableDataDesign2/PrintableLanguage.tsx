import axios from "axios";
import { ILanguage } from "../../../types/Types";
import AuthZustand from "../../../zustand/AuthZustand";
import { useQuery } from "@tanstack/react-query";

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
    <div style={{ width: "90%" }}>
      {data?.map((item) => (
        <div className="printableData-skills-container">{item.language}</div>
      ))}
    </div>
  );
};

export default PrintableLanguage;

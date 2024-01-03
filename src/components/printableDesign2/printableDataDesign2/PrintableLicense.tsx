import axios from "axios";
import { ILicense } from "../../../types/Types";
import AuthZustand from "../../../zustand/AuthZustand";
import { useQuery } from "@tanstack/react-query";

const PrintableLicense = () => {
  const user = AuthZustand((state) => state.user);

  const { data } = useQuery<ILicense[]>({
    queryKey: ["PrintableLicense"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/license/${user}`)
        .then((res) => res.data),
  });

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div>
      {data.map((item, key) => (
        <div key={key}>
          <span className="printableData-licenseName">{item.licenseName}</span>
          <div className="printableData-license-info-container">
            {item.issueingOrg} <br /> {item.issueDateMonth} -{" "}
            {item.issueDateYear}
            <br /> {item.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrintableLicense;

import axios from "axios";
import { ILicense } from "../../../types/Types";
import AuthZustand from "../../../zustand/AuthZustand";
import { useQuery } from "@tanstack/react-query";
import { Circle, Remove } from "@mui/icons-material";

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
          <h3 className="license-info-title">
            <Circle />
            {item.licenseName}
          </h3>
          <div className="license-info-container">
            <span className="license-info-item">
              <Remove />
              {item.issueingOrg}
            </span>
            <span className="license-info-item">
              <Remove />
              {item.issueDateMonth} {item.issueDateYear}
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

export default PrintableLicense;
import AuthZustand from "../../zustand/AuthZustand";
import { useQuery } from "@tanstack/react-query";
import { ILicense } from "../../types/Types";
import axios from "axios";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import UpdateLicense from "../updateLicense/UpdateLicense";

const License = () => {
  const user = AuthZustand((state) => state.user);

  const { data } = useQuery<ILicense[]>({
    queryKey: ["License"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/license/${user}`)
        .then((res) => res.data),
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [paramsId, setParamsid] = useState<string>("");

  const toggleCloseIsOpen = () => {
    setIsOpen(false);
  };

  const toggleOpenIsOpen = (id: string) => {
    setParamsid(id);
    setIsOpen(true);
  };

  return (
    <div className="career-history">
      {data?.length !== 0 ? (
        data?.map((item, key) => (
          <div className="career-history-container" key={key}>
            <div className="career-container">
              <h2 className="career-title">{item.licenseName}</h2>
              <span>{item.issueingOrg}</span>
              <span>
                {item.issueDateMonth} {item.issueDateYear}
              </span>
              <span>{item.description}</span>
            </div>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                width: "20px",
                height: "20px",
              }}
              onClick={() => toggleOpenIsOpen(item._id)}
            >
              <Edit sx={{ cursor: "pointer" }} />
            </button>
          </div>
        ))
      ) : (
        <span>There is no Licenses/Certification as of now</span>
      )}
      <Dialog open={isOpen} onClose={toggleCloseIsOpen} maxWidth="sm" fullWidth>
        <DialogContent>
          <UpdateLicense
            toggleCloseAddLicense={toggleCloseIsOpen}
            id={paramsId}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default License;

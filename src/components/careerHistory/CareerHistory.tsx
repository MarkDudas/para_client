import "./CareerHistory.css";
import AuthZustand from "../../zustand/AuthZustand";
import { useQuery } from "@tanstack/react-query";
import { ICareerHistory } from "../../types/Types";
import axios from "axios";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import UpdateCareer from "../updateCareer/UpdateCareer";

const CareerHistory = () => {
  const user = AuthZustand((state) => state.user);

  const { data } = useQuery<ICareerHistory[] | undefined>({
    queryKey: ["CareerHistory"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/career/${user}`)
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

  console.log("career", data);

  return (
    <div className="career-history">
      {data?.length !== 0 ? (
        data?.map((career, key) => (
          <div className="career-history-container" key={key}>
            <div className="career-container">
              <h2 className="career-title">{career.jobTitle}</h2>
              <span>{career.companyName}</span>
              <span>
                {career.startedDateMonth} {career.startedDateYear} -{" "}
                {career.endedDateMonth} {career.endedDateYear}
              </span>
              <span>{career.description}</span>
            </div>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                width: "20px",
                height: "20px",
              }}
              onClick={() => toggleOpenIsOpen(career._id)}
            >
              <Edit sx={{ cursor: "pointer" }} />
            </button>
          </div>
        ))
      ) : (
        <span>There is no career as of now</span>
      )}
      <Dialog open={isOpen} onClose={toggleCloseIsOpen} maxWidth="sm" fullWidth>
        <DialogContent>
          <UpdateCareer
            toggleCloseAddCareer={toggleCloseIsOpen}
            id={paramsId}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CareerHistory;

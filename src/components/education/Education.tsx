import AuthZustand from "../../zustand/AuthZustand";
import { useQuery } from "@tanstack/react-query";
import { IEducation } from "../../types/Types";
import axios from "axios";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import UpdateEducation from "../updateEducation/UpdateEducation";

const Education = () => {
  const user = AuthZustand((state) => state.user);

  const { data } = useQuery<IEducation[]>({
    queryKey: ["Education"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/education/${user}`)
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

  console.log(paramsId);

  return (
    <div className="career-history">
      {data?.length !== 0 ? (
        data?.map((career, key) => (
          <div className="career-history-container" key={key}>
            <div className="career-container">
              <h2 className="career-title">{career.course}</h2>
              <span>{career.school}</span>
              <span>{career.yearCompleted}</span>
              <span>{career.courseHighlight}</span>
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
        <span>There is no education as of now</span>
      )}
      <Dialog open={isOpen} onClose={toggleCloseIsOpen}>
        <DialogContent>
          <UpdateEducation
            toggleCloseAddEducation={toggleCloseIsOpen}
            id={paramsId}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Education;

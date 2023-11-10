import "./Printable.css";
import { Email, Home, Call } from "@mui/icons-material";
import { UserInterface } from "../../types/Types";
import { useQuery } from "@tanstack/react-query";
import AuthZustand from "../../zustand/AuthZustand";
import axios from "axios";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintableSkills from "./printableData/PrintableSkills";
import PrintableEducation from "./printableData/PrintableEducation";
import PrintableLanguage from "./printableData/PrintableLanguage";
import PrintableLicense from "./printableData/PrintableLicense";
import PrintableCareer from "./printableData/PrintableCareer";

interface Prop {
  toggleCloseResume: () => void;
}

const Printable = ({ toggleCloseResume }: Prop) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const user = AuthZustand((state) => state.user);

  const { data } = useQuery<UserInterface>({
    queryKey: ["Printable"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/user/${user}`)
        .then((res) => res.data),
  });

  return (
    <>
      <div className="printable" ref={componentRef}>
        <section className="printable-header">
          <h1 className="printable-name">
            {data?.firstName + " " + data?.lastName}
          </h1>
          <h3 className="printable-name">Position here</h3>
        </section>
        <div className="printable-body-container">
          <section className="printable-column1">
            <div className="printable-column-item">
              <h2 className="printable-column-title">Contact</h2>
              <hr className="printable-hr" />
              <span className="profile-info-list">
                <Email /> {data?.email}
              </span>
              <span className="profile-info-list">
                <Home /> {data?.address}
              </span>
              <span className="profile-info-list">
                <Call /> 09554376617
              </span>
            </div>
            <div className="printable-column-item">
              <h2 className="printable-column-title">Education</h2>
              <hr className="printable-hr" />
              <PrintableEducation />
            </div>
            <div className="printable-column-item">
              <h2 className="printable-column-title">Skills</h2>
              <hr className="printable-hr" />
              <PrintableSkills />
            </div>
            <div className="printable-column-item">
              <h2 className="printable-column-title">Language</h2>
              <hr className="printable-hr" />
              <PrintableLanguage />
            </div>
            <div className="printable-column-item">
              <h2 className="printable-column-title">
                License/ <br /> Certifications
              </h2>
              <hr className="printable-hr" />
              <PrintableLicense />
            </div>
          </section>
          <section className="printable-column2">
            <div className="printable-column-item">
              <h2 className="printable-column-title">Personal Summary</h2>
              <hr className="printable-hr" />
              <span>{data?.personalSummary}</span>
            </div>
            <div>
              <h2 className="printable-column-title">
                Professional Experience
              </h2>
              <hr className="printable-hr" />
              <PrintableCareer />
            </div>
          </section>
        </div>
      </div>
      <div className="printable-btn">
        <button
          className="profile-btn"
          style={{ color: "green", border: "2px solid green" }}
          onClick={handlePrint}
        >
          Print this out!
        </button>
        <button
          className="profile-btn"
          style={{ color: "red", border: "2px solid red" }}
          onClick={toggleCloseResume}
        >
          Close
        </button>
      </div>
    </>
  );
};

export default Printable;

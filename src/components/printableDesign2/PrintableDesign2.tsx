import "./PrintableDesign2.css";
import {
  Call,
  Email,
  LocationOn,
  Work,
  Stars,
  WorkspacePremium,
  ContactPhone,
} from "@mui/icons-material";
import {
  ICareerHistory,
  IEducation,
  ILicense,
  UserInterface,
} from "../../types/Types";
import { useQuery } from "@tanstack/react-query";
import AuthZustand from "../../zustand/AuthZustand";
import axios from "axios";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintableCareer from "./printableDataDesign2/PrintableCareer";
import PrintableSkills from "./printableDataDesign2/PrintableSkills";
import PrintableLicense from "./printableDataDesign2/PrintableLicense";
import PrintableEducation from "./printableDataDesign2/PrintableEducation";
import PrintableLanguage from "./printableDataDesign2/PrintableLanguage";

interface Prop {
  toggleCloseResume: () => void;
}

const PrintableDesign2 = ({ toggleCloseResume }: Prop) => {
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

  const { data: licenseData } = useQuery<ILicense[]>({
    queryKey: ["PrintableLicense"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/license/${user}`)
        .then((res) => res.data),
  });
  const { data: educationData } = useQuery<IEducation[]>({
    queryKey: ["PrintableEducation"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/education/${user}`)
        .then((res) => res.data),
  });

  const { data: skillsData } = useQuery<string[]>({
    queryKey: ["PrintableSkills"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/skill/${user}`)
        .then((res) => res.data),
  });

  const { data: languageData } = useQuery<string[]>({
    queryKey: ["PrintableLanguage"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/language/${user}`)
        .then((res) => res.data),
  });
  const { data: careerData } = useQuery<ICareerHistory[]>({
    queryKey: ["PrintableCareer"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/career/${user}`)
        .then((res) => res.data),
  });

  const hasLicenseData = licenseData && licenseData.length > 0;
  const hasEducationData = educationData && educationData.length > 0;
  const hasSkillsData = skillsData && skillsData.length > 0;
  const hasLanguageData = languageData && languageData.length > 0;
  const hasCareerData = careerData && careerData.length > 0;

  return (
    <>
      <div className="printableDesign2" ref={componentRef}>
        {/* <section className="printable-header">
          <h1 className="printable-name">
            {data?.firstName + " " + data?.lastName}
          </h1>
        </section> */}
        <section className="printableDesign2-header-container">
          <div className="printableDesign2-header-left">
            <section>
              <img
                className="prifileDesign2-header-image"
                src={data?.profileImage}
                alt=""
              />
            </section>
            <section className="printableDesign2-header-left-info-container">
              <h2 style={{ padding: "0", margin: "0" }}>
                {data?.firstName} {data?.lastName}
              </h2>
              <span style={{ color: "#fcc203", fontSize: "20px" }}>
                {data?.position}
              </span>
              <span style={{ width: "90%" }}>{data?.personalSummary}</span>
            </section>
          </div>
          <div className="printableDesign2-header-right">
            <div className="printableDesign2-column-item">
              <h2 className="printableDesign2-column-title">
                <ContactPhone
                  sx={{
                    padding: "7px",
                    backgroundColor: "#ffffff",
                    color: "#323b4c",
                    borderRadius: "10px",
                  }}
                />
                CONTACT INFORMATION
              </h2>
              <span className="printableDesign2-header-right-info">
                <Email
                  sx={{
                    padding: "7px",
                    backgroundColor: "#ffffff",
                    color: "#323b4c",
                    borderRadius: "10px",
                  }}
                />
                {data?.email}
              </span>
              <span className="printableDesign2-header-right-info">
                <Call
                  sx={{
                    padding: "7px",
                    backgroundColor: "#ffffff",
                    color: "#323b4c",
                    borderRadius: "10px",
                  }}
                />
                09{data?.contactNumber}
              </span>
              <span className="printableDesign2-header-right-info">
                <LocationOn
                  sx={{
                    padding: "7px",
                    backgroundColor: "#ffffff",
                    color: "#323b4c",
                    borderRadius: "10px",
                  }}
                />
                {data?.address}
              </span>
            </div>
          </div>
        </section>

        <section className="printableDesign2-body-container">
          <div className="printableDesign2-body-left">
            {hasCareerData && (
              <div className="printableDesign2-column-item">
                <h2 className="printableDesign2-column-title">
                  <Work
                    sx={{
                      padding: "10px",
                      backgroundColor: "#323B4c",
                      color: "#ffffff",
                      borderRadius: "10px",
                    }}
                  />
                  WORK EXPERIENCE
                </h2>
                <PrintableCareer />
              </div>
            )}

            {hasEducationData && (
              <div className="printableDesign2-column-item">
                <h2 className="printableDesign2-column-title">
                  <Work
                    sx={{
                      padding: "10px",
                      backgroundColor: "#323B4c",
                      color: "#ffffff",
                      borderRadius: "10px",
                    }}
                  />
                  Education
                </h2>
                <PrintableEducation />
              </div>
            )}
          </div>
          <div className="printableDesign2-body-right">
            <h2
              className="printableDesign2-column-title"
              style={{ color: "#ffffff" }}
            >
              <Stars
                sx={{
                  padding: "10px",
                  backgroundColor: "#ffffff",
                  color: "#323B4c",
                  borderRadius: "10px",
                }}
              />
              SKILLS
            </h2>
            {hasSkillsData && <PrintableSkills />}

            <h2
              className="printableDesign2-column-title"
              style={{ color: "#ffffff" }}
            >
              <WorkspacePremium
                sx={{
                  padding: "10px",
                  backgroundColor: "#ffffff",
                  color: "#323B4c",
                  borderRadius: "10px",
                }}
              />
              CERTIFICATES
            </h2>
            {hasLicenseData && <PrintableLicense />}

            <h2
              className="printableDesign2-column-title"
              style={{ color: "#ffffff" }}
            >
              <WorkspacePremium
                sx={{
                  padding: "10px",
                  backgroundColor: "#ffffff",
                  color: "#323B4c",
                  borderRadius: "10px",
                }}
              />
              LANGUAGES
            </h2>
            {hasLanguageData && <PrintableLanguage />}
          </div>
        </section>
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

export default PrintableDesign2;

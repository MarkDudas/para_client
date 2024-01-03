import axios from "axios";
import { UserInterface } from "../../types/Types";
import "./Profile.css";
import { useQuery } from "@tanstack/react-query";
import AuthZustand from "../../zustand/AuthZustand";
import { Place, Email, Call, Edit } from "@mui/icons-material";
import React, { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import AddCareer from "../../components/addCareer/AddCareer";
import CareerHistory from "../../components/careerHistory/CareerHistory";
import Education from "../../components/education/Education";
import AddEducation from "../../components/addEducation/AddEducation";
import toast from "react-hot-toast";
import AddLicense from "../../components/addLicense/AddLicense";
import License from "../../components/licenses/License";
import Skills from "../../components/skills/Skills";
import Language from "../../components/language/Language";
import AddLanguage from "../../components/addLanguage/AddLanguage";
import AddSkills from "../../components/addSkills/AddSkills";
import Printable from "../../components/printable/Printable";
import Navbar from "../../components/navbar/Navbar";
import PrintableDesign2 from "../../components/printableDesign2/PrintableDesign2";
import UploadProfilePic from "../../components/uploadProfilePic/UploadProfilePic";

const Profile = () => {
  const user = AuthZustand((state) => state.user);

  const [openAddCareer, setOpenAddCareer] = useState<boolean>(false);
  const [openAddEducation, setOpenAddEducation] = useState<boolean>(false);
  const [openAddLicense, setOpenAddLicense] = useState<boolean>(false);
  const [personalSummary, setPersonalSummary] = useState<string>("");
  const [openResume, setOpenResume] = useState<boolean>(false);
  const [design, setDesign] = useState<string>("design1");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedPosition, setEditedPosition] = useState<string>("");

  const handleEditClick = () => {
    setEditMode(true);
    setEditedPosition(data?.position || "");
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/user/update-position/${user}`,
        {
          position: editedPosition,
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPosition(event.target.value);
  };

  const { data } = useQuery<UserInterface>({
    queryKey: ["Profile"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/user/${user}`)
        .then((res) => res.data),
  });

  const toggleCloseAddCareer = () => {
    setOpenAddCareer(false);
  };

  const toggleCloseAddEducation = () => {
    setOpenAddEducation(false);
  };

  const toggleCloseAddLicense = () => {
    setOpenAddLicense(false);
  };

  const handleUpdatePersonalSummary = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/user/update/${user}`,
        {
          personalSummary: personalSummary,
        }
      );
      toast.success("Successful updated Personal Summary!", {
        icon: "👏",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleOpenResume = () => {
    setOpenResume(true);
  };

  const toggleCloseResume = () => {
    setOpenResume(false);
  };

  return (
    <div className="profile">
      <Navbar />
      <div className="profile-container">
        <section className="profile-header">
          <div className="profile-header-info-container">
            <UploadProfilePic />
            <div className="profile-header-info-right">
              <h1 style={{ padding: 0, margin: 0 }}>
                {data?.firstName + " " + data?.lastName}
              </h1>
              <span
                style={{
                  fontSize: "23px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "5px",
                  fontWeight: "600",
                }}
              >
                {editMode ? (
                  <>
                    <input
                      type="text"
                      value={editedPosition}
                      onChange={handleInputChange}
                      style={{
                        fontSize: "23px",
                        fontWeight: "600",
                        marginRight: "5px",
                        paddingLeft: "5px",
                      }}
                    />
                    <button
                      onClick={handleSaveClick}
                      style={{
                        fontSize: "12px",
                        cursor: "pointer",
                        backgroundColor: "black",
                        color: "white",
                        padding: "5px",
                        border: "none",
                        borderRadius: "5px",
                        height: "40px",
                        width: "70px",
                      }}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    {data?.position}
                    <Edit
                      onClick={handleEditClick}
                      style={{ fontSize: "12px", cursor: "pointer" }}
                    />
                  </>
                )}
              </span>
              <span className="profile-info-list">
                <Place /> {data?.address}
              </span>
              <span className="profile-info-list">
                <Email /> {data?.email}
              </span>
              <span className="profile-info-list">
                <Call /> 09{data?.contactNumber}
              </span>
            </div>
          </div>
        </section>
      </div>
      <div className="profile-input-container">
        <div>
          <h1>Personal Summary</h1>
          <span>
            Add a personal summary to your profile as a way to introduce who you
            are.
          </span>
          <textarea
            cols={30}
            rows={10}
            defaultValue={data?.personalSummary}
            className="profile-personal-summary"
            onChange={(e) => setPersonalSummary(e.target.value)}
          ></textarea>
          <button className="profile-btn" onClick={handleUpdatePersonalSummary}>
            Save
          </button>
        </div>
        <div>
          <h1>Career History</h1>
          <CareerHistory />
          <button
            className="profile-btn"
            onClick={() => setOpenAddCareer(true)}
          >
            Add Career
          </button>
        </div>
        <div>
          <h1>Education</h1>
          <Education />
          <button
            className="profile-btn"
            onClick={() => setOpenAddEducation(true)}
          >
            Add Education
          </button>
        </div>
        <div>
          <h1>License and certifications</h1>
          <License />
          <button
            className="profile-btn"
            onClick={() => setOpenAddLicense(true)}
          >
            Add License or Certifications
          </button>
        </div>
        <div>
          <h1>Skills </h1>
          <AddSkills />
          <Skills />
        </div>
        <div>
          <h1>Languages </h1>
          <AddLanguage />
          <Language />
        </div>
        <div>
          <h1>Resume </h1>
          <span>
            Print or download your resume using the data you enter with us. You
            could use this to apply to us.{" "}
            <button className="profile-btn" onClick={toggleOpenResume}>
              Click here...
            </button>
          </span>
        </div>
      </div>
      <Dialog
        open={openAddCareer}
        onClose={toggleCloseAddCareer}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <AddCareer toggleCloseAddCareer={toggleCloseAddCareer} />
        </DialogContent>
      </Dialog>
      <Dialog
        open={openAddEducation}
        onClose={toggleCloseAddEducation}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <AddEducation toggleCloseAddEducation={toggleCloseAddEducation} />
        </DialogContent>
      </Dialog>
      <Dialog
        open={openAddLicense}
        onClose={toggleCloseAddLicense}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <AddLicense toggleCloseAddLicense={toggleCloseAddLicense} />
        </DialogContent>
      </Dialog>
      <Dialog open={openResume} onClose={toggleCloseResume} maxWidth="lg">
        <DialogContent
          sx={{
            overflowX: "hidden",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="profile-btn-modal-container">
            <button
              className={
                design === "design1"
                  ? "profile-btn-modal-active"
                  : "profile-btn-modal"
              }
              onClick={() => setDesign("design1")}
            >
              Design 1
            </button>
            <button
              className={
                design === "design2"
                  ? "profile-btn-modal-active"
                  : "profile-btn-modal"
              }
              onClick={() => setDesign("design2")}
            >
              Design 2
            </button>
          </div>
          {design === "design1" ? (
            <Printable toggleCloseResume={toggleCloseResume} />
          ) : (
            <PrintableDesign2 toggleCloseResume={toggleCloseResume} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;

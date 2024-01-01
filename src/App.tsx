import "./App.css";
import { Routes, Route } from "react-router-dom";
// useLocation
import Home from "./pages/home/Home";
// import Navbar from "./components/navbar/Navbar";
import AddJob from "./pages/addJob/AddJob";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import AuthZustand from "./zustand/AuthZustand";
import Application from "./pages/application/Application";
import Profile from "./pages/profile/Profile";
import { Toaster } from "react-hot-toast";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import ApplicantList from "./pages/applicantList/ApplicantList";
import JobList from "./pages/jobList/JobList";
import ViewJob from "./pages/viewJob/ViewJob";
import OTP from "./components/otp/OTP";
import Admin from "./pages/registerHr/Admin";
import ApplicantChart from "./pages/applicantChart/ApplicantChart";
import CompanyList from "./pages/companyList/CompanyList";
function App() {
  const user = AuthZustand((state) => state.user);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/login" element={!user && <Login />} />
        <Route path="/registration" element={!user && <Registration />} />
        <Route path="/application/:id" element={<Application />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/applicant-list" element={<ApplicantList />} />
        <Route path="/job-list" element={<JobList />} />
        <Route path="/job/:id" element={<ViewJob />} />
        <Route path="/otp/:email" element={<OTP />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/applicant-chart" element={<ApplicantChart />} />
        <Route path="/company-list" element={<CompanyList />} />
      </Routes>
      <Toaster position="bottom-center" />
    </>
  );
}

export default App;

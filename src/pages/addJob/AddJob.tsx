import React, { useEffect, useState } from "react";
import "./AddJob.css";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ICompany } from "../../types/Types";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobResponsibilities, setJobResponsibilities] = useState<string>("");
  const [jobQualifications, setJobQualifications] = useState<string>("");
  const [salaryFrom, setSalaryFrom] = useState(0);
  const [salaryTo, setSalaryTo] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCompanyData, setSelectedCompanyData] = useState<ICompany>();

  const navigate = useNavigate();

  const { data: companyList } = useQuery<ICompany[]>({
    queryKey: ["CompanyList"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/company`)
        .then((res) => res.data),
  });

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/company/single/${selectedCompanyId}`
      );
      setSelectedCompanyData(res.data);
    };
    fetch();
  }, [selectedCompanyId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    if (selectedCompanyId === "") {
      return alert("Please select Company.");
    }

    if (salaryFrom === 0) {
      return alert("Please put valid Salary Starts from");
    }

    if (salaryTo === 0) {
      return alert("Please put valid Salary Ends to");
    }

    try {
      await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/job/create`, {
        jobTitle: title,
        company: selectedCompanyData?.companyName,
        jobDescription: jobDesc,
        jobResponsibilities: jobResponsibilities,
        jobQualifications: jobQualifications,
        location: selectedCompanyData?.companyLocation,
        monthlySalaryFrom: salaryFrom,
        monthlySalaryTo: salaryTo,
        companyImageUrl: selectedCompanyData?.companyImage,
      });
      setTitle("");
      setSelectedCompanyId("");
      setJobDesc("");
      setJobResponsibilities("");
      setJobQualifications("");
      setSalaryFrom(0);
      setSalaryTo(0);

      setLoading(false);
      toast.success("Successful created job posting!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="job-posting" style={{ marginTop: "10px" }}>
        <h1>Add a Job Posting</h1>
        <form onSubmit={handleSubmit}>
          <img
            src={
              selectedCompanyData?.companyImage
                ? selectedCompanyData.companyImage
                : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
            }
            style={{ width: "90%", height: "300px", marginBottom: "10px" }}
            alt="AddImage"
          />
          <div className="form-group">
            <label htmlFor="title">Job Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company</label>

            <select
              onChange={(e) => setSelectedCompanyId(e.target.value)}
              required
            >
              <option value="">Select Company</option>
              {companyList?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.companyName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Job Description</label>
            <textarea
              id="Job Description"
              rows={10}
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Job Responsibilities</label>
            <textarea
              id="Job Responsibilities"
              rows={10}
              value={jobResponsibilities}
              onChange={(e) => setJobResponsibilities(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Job Qualifications</label>
            <textarea
              id="Job Qualifications"
              rows={10}
              value={jobQualifications}
              onChange={(e) => setJobQualifications(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={selectedCompanyData?.companyLocation}
              disabled
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salary Starts from: </label>
            <input
              type="number"
              id="salary"
              defaultValue={salaryFrom}
              onChange={(e) => setSalaryFrom(parseInt(e.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salary Ends to:</label>
            <input
              type="number"
              id="salary"
              defaultValue={salaryTo}
              onChange={(e) => setSalaryTo(parseInt(e.target.value))}
              required
            />
          </div>
          <button className="profile-btn" type="submit">
            {loading ? "Please wait.." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddJob;

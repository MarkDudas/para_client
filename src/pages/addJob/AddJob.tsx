import React, { useState } from "react";
import "./AddJob.css";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../../components/navbar/Navbar";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [comp, setComp] = useState("");
  const [desc, setDesc] = useState("");
  const [loc, setLoc] = useState("");
  const [salaryFrom, setSalaryFrom] = useState(0);
  const [salaryTo, setSalaryTo] = useState(0);
  const [ImageFile, setImageFile] = useState<string>("");

  const fileTypeChecking = (e: any) => {
    var fileInput = document.getElementById("file-upload") as HTMLInputElement;
    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
    // |\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd

    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
      fileInput.value = "";
      return false;
    }

    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", ImageFile);
    data.append("upload_preset", "t6odcavz");
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/paraagency/image/upload",
      data
    );
    const { url } = uploadRes.data;

    await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/job/create`, {
      jobTitle: title,
      company: comp,
      jobDescription: desc,
      location: loc,
      monthlySalaryFrom: salaryFrom,
      monthlySalaryTo: salaryTo,
      companyImageUrl: url,
    });
    setTitle("");
    setComp("");
    setDesc("");
    setLoc("");
    setSalaryFrom(0);
    setSalaryTo(0);
    setImageFile("");
    toast.success("Successful created job posting!");
  };

  return (
    <>
      <Navbar />
      <div className="job-posting" style={{ marginTop: "10px" }}>
        <h1>Add a Job Posting</h1>
        <form onSubmit={handleSubmit}>
          <div
            className="form-group"
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              src={
                ImageFile
                  ? URL.createObjectURL(
                      new Blob([ImageFile], { type: "image/jpeg" })
                    )
                  : ""
              }
              style={{ width: "200px", height: "200px", marginBottom: "10px" }}
              alt="AddImage"
            />
            <label
              htmlFor="file-upload"
              style={{
                border: "1px solid black",
                textAlign: "center",
                padding: "10px 0",
                width: "100%",
              }}
            >
              Upload the logo of image here in png, jpeg or jpg format
              <input
                type="file"
                id="file-upload"
                onChange={fileTypeChecking}
                style={{ display: "none" }}
                required
              />
            </label>
          </div>
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
            <input
              type="text"
              id="company"
              value={comp}
              onChange={(e) => setComp(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">
              Job Description / Job Responsibilities / Qualifications:{" "}
            </label>
            <textarea
              id="description"
              rows={10}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salary Starts from: </label>
            <input
              type="text"
              id="salary"
              value={salaryFrom}
              onChange={(e) => setSalaryFrom(parseInt(e.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="salary">Salary Ends to:</label>
            <input
              type="text"
              id="salary"
              value={salaryTo}
              onChange={(e) => setSalaryTo(parseInt(e.target.value))}
              required
            />
          </div>
          <button className="profile-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddJob;

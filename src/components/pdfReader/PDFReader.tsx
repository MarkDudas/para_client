import { Document, Page } from "react-pdf";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";

interface IJobDescription {
  jobDescription: string;
  jobQualifications: string;
  jobId: string;
  actualJobPosted: string;
}

const PDFReader = ({
  jobDescription,
  jobQualifications,
  jobId,
  actualJobPosted,
}: IJobDescription) => {
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.type === "application/pdf") {
        setSelectedFile(file);
      } else {
        alert("Please select a PDF file.");
      }
    }
  };

  const sendFile = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (selectedFile) {
      const formData = new FormData();
      formData.append("pdfFile", selectedFile);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/api/openai`,
          formData,
          {
            params: {
              jobQualifications: jobQualifications,
            },
          }
        );

        formData.append("jobId", jobId);
        formData.append("name", response.data?.name);
        formData.append("job_applying", response.data?.job_applying);
        formData.append("actualJobPosted", actualJobPosted);
        formData.append("email", response.data?.email);
        formData.append("rank", String(response.data?.rank));
        formData.append("experience", response.data?.experience);
        formData.append("how", response.data?.how);
        formData.append("jobDescription", jobDescription);
        formData.append("jobQualifications", jobQualifications);
        formData.append(
          "skills",
          JSON.stringify(response.data?.skills?.map((item: string) => item))
        );

        console.log(response.data);

        console.log(response.data.name);
        console.log("hohoho", response.data.how);
        console.log(response.data.experience);

        await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/upload-files`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        setLoading(false);

        toast.success(
          "We appreciate your application! Your resume has been sent.",
          {
            icon: "👏",
          }
        );

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        setLoading(false);
        console.error("Error sending file:", error);
      }
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <h4>Upload your Resume in text-based PDF format</h4>
      <label htmlFor="file-upload" className="custom-file-upload">
        Select a File
        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          accept="application/pdf"
          className="file-input"
        />
      </label>
      {selectedFile && (
        <Document file={selectedFile}>
          <Page pageNumber={1} />
        </Document>
      )}
      {selectedFile && (
        <div style={{ paddingTop: "20px" }}>
          <button className="profile-btn" onClick={sendFile} disabled={loading}>
            {loading ? "Please wait...." : "Apply for the job"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PDFReader;

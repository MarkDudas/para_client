import axios from "axios";
import { useState } from "react";
import { Close } from "@mui/icons-material";
import toast from "react-hot-toast";

interface Prop {
  toggleCloseAddCompanyModal: () => void;
}

const AddCompany = ({ toggleCloseAddCompanyModal }: Prop) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>("");
  const [companyLocation, setCompanyLocation] = useState<string>("");
  const [imageFile, setImageFile] = useState<string>("");

  const fileTypeChecking = (e: any) => {
    var fileInput = document.getElementById("file-upload") as HTMLInputElement;
    var filePath = fileInput.value;

    var allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;

    // checking filesize
    const fileInputForChecking = e.target as HTMLInputElement;
    const fileForChecking =
      fileInputForChecking.files && fileInputForChecking.files[0];

    const maxFileSizeInBytes = 3 * 1024 * 1024; // 3 MB

    if (!fileForChecking) {
      return;
    }

    if (fileForChecking.size > maxFileSizeInBytes) {
      alert("File size exceeds the limit (3 MB)");
      fileInputForChecking.value = "";
      return false;
    }
    // checking filesize

    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
      fileInput.value = "";
      return false;
    }

    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    setLoading(true);

    e.preventDefault();

    if (imageFile === "") {
      setLoading(false);
      return alert("Company Image is required.");
    }

    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "t6odcavz");
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/paraagency/image/upload",
      data
    );
    const { url } = uploadRes.data;

    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/company/create`,
        {
          companyName: companyName,
          companyLocation: companyLocation,
          companyImage: url,
        }
      );
      toast.success("Successfully Added Company!", {
        icon: "👏",
      });

      setTimeout(() => {
        setLoading(false);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="register-hr" style={{ position: "relative" }}>
      <button
        className="applicant-list-modal-close-btn"
        onClick={toggleCloseAddCompanyModal}
      >
        <Close />
      </button>

      <h2>Add Company</h2>

      <form onSubmit={handleSubmit}>
        <div className="register-hr-form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>

        <div className="register-hr-form-group">
          <label>Company Location</label>
          <input
            type="text"
            name="CompanyLocation"
            onChange={(e) => setCompanyLocation(e.target.value)}
            required
          />
        </div>

        <div className="register-hr-form-group">
          <label>Company Image</label>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={
                imageFile
                  ? URL.createObjectURL(
                      new Blob([imageFile], { type: "image/jpeg" })
                    )
                  : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
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
              Upload Company Image here in png, jpeg or jpg format.
              <input
                type="file"
                id="file-upload"
                onChange={fileTypeChecking}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>
        <button className="register-hr-button" type="submit">
          {loading ? "Please wait.." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddCompany;

import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import AuthZustand from "../../zustand/AuthZustand";
import { useQuery } from "@tanstack/react-query";
import { UserInterface } from "../../types/Types";

const UploadProfilePic = () => {
  const [imageFile, setImageFile] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const user = AuthZustand((state) => state.user);

  const { data: UserData } = useQuery<UserInterface>({
    queryKey: ["UploadProfilePic"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/user/${user}`)
        .then((res) => res.data),
  });

  const fileTypeChecking = (e: any) => {
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    const filePath = fileInput.value;

    const allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;

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

  const handleImageClick = () => {
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    fileInput.click();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "t6odcavz");
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/paraagency/image/upload",
      data
    );
    const { url } = uploadRes.data;

    try {
      await axios.put(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/user/update-profile-image/${user}`,
        {
          profileImage: url,
        }
      );
      setLoading(false);
      toast.success("Successful change profile image!");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <form className="profile-header-info-left" onSubmit={handleSubmit}>
      <input
        id="file-upload"
        type="file"
        onChange={fileTypeChecking}
        style={{ display: "none" }}
      />

      <div
        className="profile-header-info-left"
        onClick={handleImageClick}
        style={{ cursor: "pointer" }}
      >
        <img
          className="profile-image"
          src={
            imageFile
              ? URL.createObjectURL(
                  new Blob([imageFile], { type: "image/jpeg" })
                )
              : UserData?.profileImage
          }
          alt=""
        />
      </div>

      <button
        disabled={!imageFile}
        type="submit"
        className="profile-submit-image-btn"
      >
        {loading ? "Please Wait.." : "Submit Image"}
      </button>
    </form>
  );
};

export default UploadProfilePic;

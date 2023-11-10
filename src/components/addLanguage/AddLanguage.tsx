import axios from "axios";
import { useState } from "react";
import AuthZustand from "../../zustand/AuthZustand";
import toast from "react-hot-toast";

const AddLanguage = () => {
  const [language, setLanguage] = useState<string>("");

  const user = AuthZustand((state) => state.user);

  const handleAddLanguage = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/language/create`,
        {
          language: language,
          email: user,
        }
      );
      toast.success("Successfully Added Language!", {
        icon: "👏",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        margin: "10px",
        marginBottom: "20px",
      }}
    >
      <input
        className="profile-input"
        type="text"
        onChange={(e) => setLanguage(e.target.value)}
      />
      <button className="profile-btn" onClick={handleAddLanguage}>
        Add Language
      </button>
    </div>
  );
};

export default AddLanguage;

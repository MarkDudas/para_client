import axios from "axios";
import { useState } from "react";
import AuthZustand from "../../zustand/AuthZustand";
import toast from "react-hot-toast";

const AddSkills = () => {
  const [skill, setSkill] = useState<string>("");

  const user = AuthZustand((state) => state.user);

  const handleAddSkill = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/skill/create`, {
        skill: skill,
        email: user,
      });
      toast.success("Successful Added Skill!", {
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
        onChange={(e) => setSkill(e.target.value)}
      />
      <button className="profile-btn" onClick={handleAddSkill}>
        Add Skill
      </button>
    </div>
  );
};

export default AddSkills;

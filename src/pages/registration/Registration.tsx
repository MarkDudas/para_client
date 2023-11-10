import { useState } from "react";
import "./Registration.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

const Registration = () => {
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("Male");
  const [birthday, setBirthday] = useState<string>(
    moment().format("YYYY-MM-DD")
  );

  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (password.trim !== confirmPassword.trim) {
      return alert("Password and Confirm Password not match!");
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/user/register`,
        {
          lastName: lastName,
          firstName: firstName,
          email: email,
          address: address,
          birthday: birthday,
          gender: gender,
          position: position,
          password: password,
        }
      );
      toast.success("Successful Registration!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="registration">
      <div className="registration-container">
        <h1>Please Register your Account here</h1>
        <div className="registration-input-group two-columns">
          <label className="two-columns-label">
            Last Name
            <input
              type="text"
              className="two-columns-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            First Name
            <input
              type="text"
              className="two-columns-input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
        </div>

        <div className="registration-input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="registration-input-group">
          <label>Home Full Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="registration-input-group">
          <label>Position Applying for:</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        {/*  */}
        <div className="registration-input-group two-columns">
          <label className="two-columns-label">
            Gender
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="two-columns-input"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label className="two-columns-label">
            Birthday
            <input
              type="date"
              value={birthday}
              className="two-columns-input"
              onChange={(e) => setBirthday(e.target.value)}
            />
          </label>
        </div>
        {/*  */}
        <div className="registration-input-group two-columns">
          <label className="two-columns-label">
            Password
            <input
              type="text"
              className="two-columns-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className="two-columns-label">
            Confirm Password
            <input
              type="text"
              className="two-columns-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        </div>

        <div className="registration-button-group">
          <button type="submit" onClick={handleSubmit}>
            Register
          </button>
          <Link
            to="/login"
            className="registration-link"
            style={{ textDecoration: "none" }}
          >
            <button type="button">Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;

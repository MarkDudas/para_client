import { useState } from "react";
import "./Registration.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import Joi from "joi";
import { PatternFormat } from "react-number-format";

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
  const [contactNumber, setContactNumber] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const passwordSchema = Joi.object({
      password: Joi.string()
        .min(6)
        .regex(/^(?=.*[A-Z])(?=.*\d)/)
        .required()
        .messages({
          "string.min": "Password must be at least 6 characters long",
          "string.pattern.base":
            "Password must contain at least one uppercase letter and one digit",
        }),
    });
    const passwordValidationResult = passwordSchema.validate({ password });

    if (passwordValidationResult.error) {
      toast.error(
        passwordValidationResult.error.details
          .map((detail) => detail.message)
          .join(", ")
      );
      return;
    }

    if (
      !lastName.trim() ||
      !firstName.trim() ||
      !email.trim() ||
      !address.trim() ||
      !position.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      toast.error("Please fill in all the fields.");
      return;
    }

    if (password.trim() !== confirmPassword.trim()) {
      toast.error("Password and Confirm Password do not match!");
      return;
    }

    try {
      // Check if the email already exists
      const emailExistsResponse = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/user/check-email`,
        {
          email: email,
        }
      );

      if (emailExistsResponse.data.emailExists) {
        toast.error("Email already in use. Please use a different email.");
        return;
      }

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
          contactNumber: contactNumber,
        }
      );
      toast.success("Successful Registration!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Error.");
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
              required
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
              required
            />
          </label>
        </div>

        <div className="registration-input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="registration-input-group">
          <label>Contact Number</label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "2px solid black",
              paddingLeft: "15px",
              height: "40px",
              borderRadius: "5px",
              padding: "0 10px",
              width: "90%",
            }}
          >
            <span style={{ color: "#BEBEBE" }}>09</span>
            <PatternFormat
              format="##-###-####"
              mask="_"
              style={{
                outline: "none",
                border: "none",
                height: "40px",
                fontSize: "18px",
                paddingLeft: "5px",
              }}
              onValueChange={(values) => {
                const { value } = values;
                setContactNumber(value);
              }}
            />
          </div>
        </div>

        <div className="registration-input-group">
          <label>Home Full Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="registration-input-group">
          <label>Position Applying for:</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
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
              required
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
              required
            />
          </label>
        </div>
        {/*  */}
        <div className="registration-input-group two-columns">
          <label className="two-columns-label">
            Password
            <input
              type="password"
              className="two-columns-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="two-columns-label">
            Confirm Password
            <input
              type="password"
              className="two-columns-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
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

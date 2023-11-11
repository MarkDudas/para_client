import { useState } from "react";
import "./RegisterHr.css";
import axios from "axios";
import toast from "react-hot-toast";

export interface UserInterface {
  lastName: string;
  firstName: string;
  email: string;
  address: string;
  password: string;
  confirmPassword: string;
}

const RegisterHr = () => {
  const [user, setUser] = useState<UserInterface>({
    lastName: "",
    firstName: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async () => {
    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/user/register`,
        {
          lastName: user.lastName,
          firstName: user.firstName,
          email: user.email,
          address: user.address,
          password: user.password,
          role: "hr",
        }
      );
      toast.success("Successfully register an HR!", {
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
    <div className="register-hr">
      <h2>HR Registration</h2>
      <div>
        <div className="register-hr-form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="register-hr-form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="register-hr-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="register-hr-form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
        </div>
        <div className="register-hr-form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="register-hr-form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button className="register-hr-button" onClick={handleSubmit} >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterHr;

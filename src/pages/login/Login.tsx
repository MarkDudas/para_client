import "./Login.css";
import axios from "axios";
import React, { useState } from "react";
import { LoginInterface } from "../../types/Types";
import AuthZustand from "../../zustand/AuthZustand";
import { useNavigate } from "react-router-dom";
import { Person, LockPerson } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Login = () => {
  const setUser = AuthZustand((state) => state.setUser);

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState<LoginInterface>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>("");

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/user/login`,
        credentials
      );
      setUser(credentials.email);
      navigate("/");
    } catch (err) {
      console.log(err);
      setErrors("Incorrect email or password.");
    }
  };

  const handleForgotPasswordNavigation = async () => {
    if (credentials.email === "") {
      alert(
        "Please enter your email in the email input to proceed with the forgot password process."
      );
    } else {
      setLoading(true);
      try {
        await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/email/send`, {
          email: credentials.email,
        });
        setLoading(false);
        navigate(`/otp/${credentials.email}`);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>Sign in to your Account</h1>

        <div className="login-form-container">
          <div className="login-input-group">
            <label htmlFor="email">
              Email
              <div className="login-input-container">
                <Person />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={onChangeHandler}
                />
              </div>
            </label>
          </div>
          <div className="login-input-group">
            <label htmlFor="password">
              Password
              <div className="login-input-container">
                <LockPerson />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={onChangeHandler}
                />
              </div>
            </label>
          </div>
          {errors && (
            <div style={{ padding: "5px 0" }}>
              <span style={{ color: "red" }}>{errors}</span>
            </div>
          )}
          <div className="login-forgot-password">
            <span onClick={handleForgotPasswordNavigation}>
              {loading ? "Please wait.. " : "Forgot Password?"}
            </span>
          </div>
          <div className="button-group">
            <button type="submit" onClick={handleLogin}>
              Log In
            </button>
          </div>
          <div className="register-btn-container">
            <span>Don't have account? Register</span>
            <Link to="/registration">
              <button>here</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

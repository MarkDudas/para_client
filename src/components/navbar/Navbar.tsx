import "./Navbar.css";
import {
  Close,
  // Facebook,
  // LinkedIn,
  // WhatsApp,
  KeyboardArrowDown,
  Menu,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import AuthZustand from "../../zustand/AuthZustand";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserInterface } from "../../types/Types";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const user = AuthZustand((state) => state.user);
  const clearUser = AuthZustand((state) => state.clearUser);

  const navigate = useNavigate();

  const logout = () => {
    clearUser();
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const [userData, setUserData] = useState<UserInterface>();

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/user/${user}`
      );
      setUserData(res.data);
    };
    fetch();
  }, []);

  const handleGoToProfile = () => {
    if (userData?.role === "user") {
      navigate("/profile");
    }
  };

  return (
    <div className="nav">
      {/* <div className="nav-top-container">
        <div className="nav-socials-container">
          <section></section>
          <section
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <Facebook />
            <LinkedIn />
            <WhatsApp />
          </section>
        </div>
      </div> */}
      {/*  */}
      <div className="nav-bottom-container">
        <div className="nav-container">
          <section className="nav-link-container">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <img src={logo} alt="logo" className="nav-logo" />
            </Link>
            {userData?.role === "hr" && (
              <>
                <Link
                  to="/add-job"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <span className="nav-link">Add Job Posting</span>
                </Link>
                <Link
                  to="/applicant-list"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <span className="nav-link">Applicant List</span>
                </Link>
                <Link
                  to="/job-list"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <span className="nav-link">Job List</span>
                </Link>
              </>
            )}
            {userData?.role === "admin" && (
              <>
                <Link
                  to="/admin"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <span className="nav-link">Register HR</span>
                </Link>

                <Link
                  to="/applicant-chart"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <span className="nav-link">Analytics</span>
                </Link>
                <Link
                  to="/job-list"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <span className="nav-link">Job List</span>
                </Link>
                <Link
                  to="/company-list"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <span className="nav-link">Company List</span>
                </Link>
              </>
            )}
          </section>
          {/* <section className="nav-action-container"> */}
          <section className={click ? "nav-menu active" : "nav-menu"}>
            {user ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
                className="navbar-user-logout-container"
              >
                {/* <Link
                  to={userData?.role === "user" && "/profile"}
                  style={{ textDecoration: "none", color: "white" }}
                > */}
                <a
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                    textDecoration: "none",
                  }}
                  className="navbar-user-span"
                  onClick={handleGoToProfile}
                >
                  {user} <KeyboardArrowDown />
                </a>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  <button onClick={logout} className="navbar-logout-btn">
                    Logout
                  </button>
                </Link>
              </div>
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <button className="nav-btn">LOGIN</button>
              </Link>
            )}
          </section>
        </div>
        <div className="nav-icon" onClick={handleClick}>
          {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

          {click ? (
            <span className="icon">
              <Close sx={{ color: "white" }} />
            </span>
          ) : (
            <span className="icon">
              <Menu sx={{ color: "white" }} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

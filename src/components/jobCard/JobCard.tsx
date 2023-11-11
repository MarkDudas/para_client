import axios from "axios";
import { IApplicant, IJob, UserInterface } from "../../types/Types";
import { formatSalary } from "../../utilities/Utilities";
import AuthZustand from "../../zustand/AuthZustand";
import "./JobCard.css";
import { Paid, Place } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface Prop {
  item: IJob;
}

const JobCard: React.FC<Prop> = ({ item }) => {
  const user = AuthZustand((state) => state.user);

  const [userData, setUserData] = useState<UserInterface>();

  const { data } = useQuery<IApplicant[] | undefined>({
    queryKey: ["Applicants"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/applicant/${user}`)
        .then((res) => res.data),
  });

  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/user/${user}`
        );
        setUserData(res.data);
      };
      fetch();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const hasUserApplied = () => {
    if (!data) {
      return false;
    }

    return data?.some((applicant) => applicant.jobId === item._id);
  };

  return (
    <div className="jobcard">
      <div className="jobcard-container">
        <section className="jobcard-section">
          <img
            className="job-image"
            src={item.companyImageUrl}
            alt={item.jobTitle}
          />
          <div className="jobcard-info-container">
            <h3 className="job-title">{item.jobTitle}</h3>
            <span className="job-company">{item.company}</span>
          </div>
        </section>
        <section className="jobcard-section responsive">
          <Paid sx={{ fontSize: "50px" }} className="jobcard-icon" />
          <div className="jobcard-info-container">
          <span className="job-highlight">
  {formatSalary(item.monthlySalaryFrom)} - {formatSalary(item.monthlySalaryTo)}
</span>

            <span className="job-description">Monthly salary</span>
          </div>
        </section>
        <section className="jobcard-section responsive">
          <Place sx={{ fontSize: "50px" }} className="jobcard-icon" />
          <div className="jobcard-info-container">
            <span className="job-highlight">{item.location}</span>
            <span className="job-description">Location</span>
          </div>
        </section>
        {userData?.role === "user" && (
          <Link to={user ? `/application/${item._id}` : "/login"}>
            <button className="profile-btn" disabled={hasUserApplied()}>
              Apply now
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default JobCard;

import { IJob } from "../../types/Types";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { AttachMoney, Place } from "@mui/icons-material";
import { formatSalary } from "../../utilities/Utilities";
import Navbar from "../../components/navbar/Navbar";

const ViewJob = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data } = useQuery<IJob>({
    queryKey: ["ViewJob"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/job/list/${id}`)
        .then((res) => res.data),
  });

  return (
    <>
      <Navbar />
      <div className="application" style={{ paddingTop: "30px" }}>
        <div className="application-container">
          <div className="application-info-container">
            <img
              src={data?.companyImageUrl}
              alt="company image"
              className="application-company-image"
            />
            <h2 className="application-job-title">{data?.jobTitle}</h2>
            <h3 className="application-job-company">{data?.company}</h3>
            <span className="application-item">
              <Place />
              {data?.location}
            </span>
            {data?.monthlySalaryFrom && data.monthlySalaryTo && (
              <span className="application-item">
                <AttachMoney /> {formatSalary(data?.monthlySalaryFrom)} -{" "}
                {formatSalary(data?.monthlySalaryTo)}
              </span>
            )}
            <span>Posted: {moment(data?.createdAt).format("YYYY-MM-DD")}</span>
            <h3 style={{ paddingLeft: 0 }}>Job Description: </h3>
            <span>{data?.jobDescription}</span>
            <h3 style={{ paddingLeft: 0 }}>Job Responsibilities: </h3>
            <span>{data?.jobResponsibilities}</span>
            <h3 style={{ paddingLeft: 0 }}>Job Qualification: </h3>
            <span>{data?.jobQualifications}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewJob;

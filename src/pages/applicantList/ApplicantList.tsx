import "./ApplicantList.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
} from "@mui/material";
import { Search, Close } from "@mui/icons-material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { IApplicant, IJob } from "../../types/Types";
import moment from "moment";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";

const ApplicantList = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedJobPosted, setSelectedJobPosted] = useState<string>("All");
  const [sortOption, setSortOption] = useState<string>("rank-asc");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedJobDescription, setSelectedJobDescription] =
    useState<string>("");
  const [selectedHow, setSelectedHow] = useState<string>("");
  // const [experienceFilter, setExperienceFilter] = useState<string>("");

  const { data: applicants } = useQuery<IApplicant[] | undefined>({
    queryKey: ["ApplicantList"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/applicant`)
        .then((res) => res.data),
  });

  const { data: jobPostings } = useQuery<IJob[] | undefined>({
    queryKey: ["JobPostings"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/job/list`)
        .then((res) => res.data),
  });

  const showPDF = (pdfName: string) => {
    window.open(`${pdfName}`);
  };

  function calculateAge(birthday: string) {
    const birthDate = new Date(birthday);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Check if the birthday for the current year has passed, if not, subtract 1 from age
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  const sortedApplicants = applicants
    ? [...applicants].sort((a, b) => {
        if (sortOption === "age-asc") {
          const ageA = calculateAge(a.birthday);
          const ageB = calculateAge(b.birthday);
          return ageA - ageB;
        } else if (sortOption === "age-desc") {
          const ageA = calculateAge(a.birthday);
          const ageB = calculateAge(b.birthday);
          return ageB - ageA;
        } else if (sortOption === "rank-asc") {
          return a.rank - b.rank;
        } else if (sortOption === "rank-desc") {
          return b.rank - a.rank;
        }
        return 0;
      })
    : applicants;

  const jobsThatAreNotArchived = jobPostings?.filter(
    (item) => item.isArchive === false
  );

  console.log("jobsTHatAre not archived", jobsThatAreNotArchived);

  const filtered = sortedApplicants
    ? sortedApplicants.filter((item) => {
        const jobPostedFilter =
          selectedJobPosted === "All" ||
          (item.actualJobPosted && item.actualJobPosted === selectedJobPosted);

        // const experienceFilterCondition =
        //   !experienceFilter ||
        //   (item.experience &&
        //     item.experience.toLowerCase().includes(experienceFilter.toLowerCase()));

        const isJobNotArchived =
          jobsThatAreNotArchived &&
          jobsThatAreNotArchived.some(
            (job) => job.jobTitle === item.actualJobPosted
          );

        // // Fix the placement of the closing parenthesis for the searchTerm condition
        return (
          jobPostedFilter &&
          isJobNotArchived &&
          (item?.email?.toLowerCase().includes(searchTerm) ||
            item.name.toLowerCase().includes(searchTerm))
        );
      })
    : sortedApplicants;

  const toggleOpenModal = (jobDescription: string, how: string) => {
    setSelectedJobDescription(jobDescription);
    setSelectedHow(how);
    setOpenModal(true);
  };

  const toggleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Navbar />
      <div className="applicant-list">
        <TableContainer className="applicant-list-container">
          <div className="applicant-filter-container">
            <section className="applicant-search">
              <Search />
              <input
                placeholder="Search by name or email"
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </section>
            {/* <section className="applicant-search">
              <Search />
              <input
    type="text"
    placeholder="Filter by Experience"
    onChange={(e) => setExperienceFilter(e.target.value)}
  />
               
            </section> */}

            <section className="applicant-filters">
              <Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                sx={{ backgroundColor: "#f2f2f2" }}
              >
                {/* <MenuItem value="age-asc">Sort by Age (Ascending)</MenuItem>
                <MenuItem value="age-desc">Sort by Age (Descending)</MenuItem> */}
                <MenuItem value="rank-asc">Sort by Rank (Ascending)</MenuItem>
                <MenuItem value="rank-desc">Sort by Rank (Descending)</MenuItem>
              </Select>

              <Select
                sx={{ backgroundColor: "#f2f2f2" }}
                value={selectedJobPosted}
                onChange={(e) => setSelectedJobPosted(e.target.value)}
              >
                <MenuItem value="All">Position</MenuItem>
                {jobPostings?.map((jobPosting, key) => (
                  <MenuItem key={key} value={jobPosting.jobTitle}>
                    {jobPosting.jobTitle}
                  </MenuItem>
                ))}
              </Select>
            </section>
          </div>

          <Table>
            <TableHead className="applicant-list-table-header">
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Job Posted
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Applicant Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Applicant Email
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Application Date
                </TableCell>
                {/* <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Experience
                </TableCell> */}
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Job Application Match (%)
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  How
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Action Button
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered?.map((item, key) => (
                <TableRow key={key} className="applicant-list-table-row">
                  <TableCell align="center">{item.actualJobPosted}</TableCell>
                  <TableCell align="center" sx={{ textTransform: "uppercase" }}>
                    {item.name}
                  </TableCell>
                  <TableCell align="center">{item.email}</TableCell>
                  <TableCell align="center">
                    {moment(item.createdAt).format("YYYY-MM-DD HH:mma")}
                  </TableCell>
                  {/* <TableCell align="center">{item.experience}</TableCell> */}
                  <TableCell
                    align="center"
                    sx={
                      item.rank >= 50 && item.rank <= 79
                        ? { color: "#F7CB73" }
                        : item.rank >= 80
                        ? { color: "#37B71D" }
                        : { color: "#FF0000" }
                    }
                  >
                    {item.rank}%
                  </TableCell>
                  <TableCell align="center">
                    <button
                      className="applicant-list-modal-btn"
                      onClick={() =>
                        toggleOpenModal(item.jobQualifications, item.how)
                      }
                    >
                      See Job Description and "How" it is rank
                    </button>
                  </TableCell>
                  <TableCell align="center">
                    <button
                      className="profile-btn"
                      style={{ padding: "5px 10px", width: "150px" }}
                      onClick={() => showPDF(item.pdfFile)}
                    >
                      View Resume
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={openModal} onClose={toggleCloseModal}>
          <DialogContent>
            <div className="applicant-list-modal-container">
              <button
                className="applicant-list-modal-close-btn"
                onClick={toggleCloseModal}
              >
                <Close />
              </button>
              <label>
                Job Qualifications:
                <span>{selectedJobDescription}</span>
              </label>
              <label>
                How:
                <span>{selectedHow}</span>
              </label>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ApplicantList;

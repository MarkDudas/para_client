import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IJob } from "../../types/Types";
import moment from "moment";
import { formatSalary } from "../../utilities/Utilities";
import { Link } from "react-router-dom";
import AuthZustand from "../../zustand/AuthZustand";
import Navbar from "../../components/navbar/Navbar";
// import toast from "react-hot-toast";

const JobList = () => {
  const user = AuthZustand((state) => state.user);

  const { data } = useQuery<IJob[]>({
    queryKey: ["JobList"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/job/list`)
        .then((res) => res.data),
  });

  const handleIsArchive = async (id: string, newValue: string) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/job/update/${id}`,
        {
          isArchive: newValue,
          updatedBy: user,
        }
      );
      //   toast.success(`Successfully change archive status`, {
      //     icon: "👏",
      //   });
      //   setTimeout(() => {
      window.location.reload();
      //   }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="applicant-list">
        <TableContainer className="applicant-list-container">
          <Table>
            <TableHead className="applicant-list-table-header">
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Job Title
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Company
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Location
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Monthly Salary
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Created Date
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Archive
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Action Button
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((item, key) => (
                <TableRow key={key} className="applicant-list-table-row">
                  <TableCell align="center">{item.jobTitle}</TableCell>
                  <TableCell align="center">{item.company}</TableCell>
                  <TableCell align="center">{item.location}</TableCell>

                  <TableCell align="center">
                    {formatSalary(item.monthlySalaryFrom)} -{" "}
                    {formatSalary(item.monthlySalaryTo)}
                  </TableCell>
                  <TableCell align="center">
                    {moment(item.createdAt).format("YYYY-MM-DD HH:mma")}
                  </TableCell>
                  <TableCell align="center">
                    <Select
                      sx={{ backgroundColor: "#f2f2f2" }}
                      value={item.isArchive ? "true" : "false"}
                      onChange={(e) =>
                        handleIsArchive(item._id, e.target.value)
                      }
                    >
                      <MenuItem value="true">Yes</MenuItem>
                      <MenuItem value="false">No</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell align="center">
                    <Link to={`/job/${item._id}`}>
                      <button>View Job Posting</button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default JobList;

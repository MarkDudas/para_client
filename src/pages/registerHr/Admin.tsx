import {
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import { UserInterface } from "../../types/Types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import RegisterHr from "../../components/registerHr/RegisterHr";
import "./Admin.css"

const Admin = () => {
  const { data } = useQuery<UserInterface[] | undefined>({
    queryKey: ["Admin"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/user/list/hr`)
        .then((res) => res.data),
  });

  const [open, setOpen] = useState<boolean>(false);

  const toggleCloseModal = () => {
    setOpen(false);
  };

  const toggleOpenModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Navbar />
      <div className="applicant-list">
        <TableContainer className="applicant-list-container">
          <div className="applicant-filter-container">
            <button className='register-button' onClick={toggleOpenModal}>Register an HR</button>
          </div>

          <Table>
            <TableHead className="applicant-list-table-header">
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  ID
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  FullName
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Address
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Created Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((item, key) => (
                <TableRow key={key} className="applicant-list-table-row">
                  <TableCell align="center">{item._id}</TableCell>
                  <TableCell align="center">{item.email}</TableCell>
                  <TableCell align="center">
                    {item.lastName} {", "} {item.firstName}
                  </TableCell>
                  <TableCell align="center" sx={{ textTransform: "uppercase" }}>
                    {item.address}
                  </TableCell>
                  <TableCell align="center">
                    {moment(item.createdAt).format("YYYY-MM-DD HH:mma")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Dialog open={open} onClose={toggleCloseModal} maxWidth="md">
        <DialogContent>
          <RegisterHr />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Admin;

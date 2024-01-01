import { useQuery } from "@tanstack/react-query";
import Navbar from "../../components/navbar/Navbar";
import "./CompanyList.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogContent,
} from "@mui/material";
import axios from "axios";
import { ICompany } from "../../types/Types";
import moment from "moment";
import { useState } from "react";
import AddCompany from "../../components/addCompany/AddCompany";
import UpdateCompany from "../../components/updateCompany/UpdateCompany";

const CompanyList = () => {
  const [openAddCompanyModal, setOpenAddCompanyModal] =
    useState<boolean>(false);
  const [openUpdateCompanyModal, setOpenUpdateCompanyModal] =
    useState<boolean>(false);
  const [paramsId, setParamsId] = useState<string>("");

  const { data } = useQuery<ICompany[]>({
    queryKey: ["CompanyList"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/company`)
        .then((res) => res.data),
  });

  const toggleOpenAddCompanyModal = () => {
    setOpenAddCompanyModal(true);
  };

  const toggleCloseAddCompanyModal = () => {
    setOpenAddCompanyModal(false);
  };

  const toggleOpenUpdateCompanyModal = (id: string) => {
    setParamsId(id);
    setOpenUpdateCompanyModal(true);
  };

  const toggleCloseUpdateCompanyModal = () => {
    setOpenUpdateCompanyModal(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/company/delete/${id}`
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="applicant-list">
        <TableContainer className="applicant-list-container">
          <div className="applicant-filter-container">
            <button
              className="register-button"
              onClick={toggleOpenAddCompanyModal}
            >
              Add Company
            </button>
          </div>
          <Table>
            <TableHead className="applicant-list-table-header">
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Company Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Company Location
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Company Image
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Created At
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Action Button
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((item, key) => (
                <TableRow key={key} className="applicant-list-table-row">
                  <TableCell align="center">{item.companyName}</TableCell>
                  <TableCell align="center" sx={{ textTransform: "uppercase" }}>
                    {item.companyLocation}
                  </TableCell>
                  <TableCell align="center">
                    <img
                      src={item.companyImage}
                      alt="Company Image"
                      className="company-list-image"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {moment(item.createdAt).format("YYYY-MM-DD HH:mma")}
                  </TableCell>
                  <TableCell align="center">
                    <button
                      className="profile-btn"
                      onClick={() => toggleOpenUpdateCompanyModal(item._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="profile-btn"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={openAddCompanyModal} onClose={toggleCloseAddCompanyModal}>
          <DialogContent>
            <AddCompany
              toggleCloseAddCompanyModal={toggleCloseAddCompanyModal}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          open={openUpdateCompanyModal}
          onClose={toggleCloseUpdateCompanyModal}
        >
          <DialogContent>
            <UpdateCompany
              toggleCloseUpdateCompanyModal={toggleCloseUpdateCompanyModal}
              paramsId={paramsId}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CompanyList;

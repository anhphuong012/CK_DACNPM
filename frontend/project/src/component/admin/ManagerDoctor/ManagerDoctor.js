import HeaderAdmin from "../HeaderAdmin/HeaderAdmin";
import "../ManagerUser/ManagerUser.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { auto, end, right } from "@popperjs/core";

import LockIcon from "@mui/icons-material/Lock";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import CircularProgress from "@mui/material/CircularProgress";

import { useNavigate } from "react-router-dom";

const columns = [
  { id: "id", label: "ID", minWidth: 100 },
  {
    id: "image",
    label: "Hình ảnh",
    minWidth: 120,
    align: "left",
  },
  { id: "name", label: "Họ Tên", minWidth: 170 },

  {
    id: "department",
    label: "Phòng ban",
    minWidth: 170,
    align: "left",
  },
  {
    id: "function",
    label: "Chức năng",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
];

export default function ManagerDoctor() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [data, setData] = useState(null);
  const [temp, setTemp] = useState(null);

  const [show, setShow] = useState(false);

  const [selectDelete, setSelectDelete] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  const [selectShow, setSelectShow] = useState(null);

  //Lọc sản phẩm
  const [value, setValue] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (selectShow) => {
    setShow(true);
    setSelectShow(selectShow);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("/v1/account/doctors");
      // ,
      //   {
      //   headers: {
      //     Authorization: `Bearer ${sessionStorage.getItem("token").toString()}`,
      //   },
      // }

      if (response.status === 200) {
        if (response.data.data != null) {
          setData(response.data.data);
          setTemp(response.data.data);
          console.log(data);
        }
      }
    } catch (error) {
      console.log(error);
      //   navigate("/login");
    }
  };

  useEffect(() => {
    if (value == "") {
      setData(temp);
    } else {
      const updateData = temp.filter((user) =>
        user.doctor.fullName.toLowerCase().includes(value.toLowerCase())
      );
      setData(updateData);
    }
  }, [value]);

  useEffect(() => {
    fetchData();
    setIsLoad(true);
  }, []);
  return (
    <div className="container-main mb-5">
      <HeaderAdmin></HeaderAdmin>
      {!isLoad && (
        <Box sx={{ marginTop: "7rem", width: "100%", margin: auto }}>
          <CircularProgress />
        </Box>
      )}
      {isLoad && (
        <div className="main-content">
          <h3 className="title-manager">Quản lí bác sĩ</h3>
          <div className="container-form-search ">
            <div className="mb-4 wrap-btn-add">
              <button
                className={"btn btn-primary"}
                onClick={() => {
                  navigate("/admin/manage-doctor/add");
                }}
              >
                Thêm bác sĩ
              </button>
            </div>

            <div>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-size-small"
                  label="Lọc"
                  variant="outlined"
                  size="small"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  sx={{ backgroundColor: "#fff" }}
                />
              </Box>
            </div>
          </div>
          <Paper sx={{ width: "100%" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      Tài khoản
                    </TableCell>
                    <TableCell align="center" colSpan={3}>
                      Chức năng
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align="left"
                        style={{ top: 57, minWidth: column.minWidth }}
                      >
                        <strong>{column.label}</strong>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data != null &&
                    data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.id}
                          >
                            {/* {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })} */}
                            <TableCell align="left">{row.id}</TableCell>
                            <TableCell align="left">
                              <img
                                src={row.doctor.avatar}
                                className="avatar"
                                alt={row.doctor.fullName}
                              ></img>
                            </TableCell>
                            <TableCell align="left">
                              {row.doctor.fullName}
                            </TableCell>

                            <TableCell align="left">
                              {row.doctor.department}
                            </TableCell>

                            <TableCell align="left">
                              <button
                                className={"btn btn-info mr-2"}
                                title="Xem"
                                onClick={() => {
                                  handleShow(row);
                                }}
                              >
                                <RemoveRedEyeIcon></RemoveRedEyeIcon>
                              </button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data != null ? data.length : 10}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          {selectShow != null && (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Thông tin Bác sĩ</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>Mã : {selectShow.id}</div>
                <div className="roll-infor mt-3"></div>
                <div className="mt-3">
                  <div>
                    {" "}
                    <strong>UserName:</strong>{" "}
                    <span>{selectShow.username}</span>
                  </div>
                  <div>
                    {" "}
                    <strong>Họ tên:</strong>{" "}
                    <span>{selectShow.doctor.fullName}</span>
                  </div>

                  <div>
                    {" "}
                    <strong>Email:</strong>{" "}
                    <span>{selectShow.doctor.email}</span>
                  </div>

                  <div>
                    {" "}
                    <strong>Học vị:</strong>{" "}
                    <span>{selectShow.doctor.degree}</span>
                  </div>

                  <div>
                    {" "}
                    <strong>Phòng ban:</strong>{" "}
                    <span>{selectShow.doctor.department}</span>
                  </div>

                  <div>
                    {" "}
                    <strong>Nơi làm việc:</strong>{" "}
                    <span>{selectShow.doctor.placeOfwork}</span>
                  </div>

                  <div>
                    {" "}
                    <strong>Vai trò:</strong> <span>{selectShow.role}</span>
                  </div>

                  <div>
                    {" "}
                    <strong>Trạng thái:</strong>{" "}
                    {selectShow && (
                      <span class="badge badge-success">Đang hoạt động</span>
                    )}
                    {!selectShow && (
                      <span class="badge badge-dange">Bị Khóa</span>
                    )}
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Trở Lại
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
}

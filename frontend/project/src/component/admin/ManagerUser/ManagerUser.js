import HeaderAdmin from "../HeaderAdmin/HeaderAdmin";
import "./ManagerUser.css";
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
  { id: "phone", label: "Tên tài khoản", minWidth: 170 },
  {
    id: "email",
    label: "email",
    minWidth: 120,
    align: "left",
  },
  {
    id: "fullName",
    label: "Họ Tên",
    minWidth: 170,
    align: "left",
  },
  {
    id: "status",
    label: "Trạng Thái",
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

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

export default function ManagerUser() {
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
      const response = await axios.get("/v1/account/users");
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
      navigate("/login");
    }
  };

  useEffect(() => {
    if (value == "") {
      setData(temp);
    } else {
      const updateData = temp.filter((user) =>
        user.patient.fullName.toLowerCase().includes(value.toLowerCase())
      );
      setData(updateData);
    }
  }, [value]);

  const handleBlock = async (id) => {
    const response = await axios.put(
      `/v1/account/changeStatus/${id}?type=block`
    );

    if (response.status == 200) {
      if (response.data.data) {
        updateItem(id, false);
        toast.success("Khóa thành công");
      } else {
        toast.error("Đã xảy ra lỗi!");
      }
    }
  };

  const updateItem = (id, newValue) => {
    setData((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, status: newValue } : item
      )
    );
  };

  const handleOpenBlock = async (id) => {
    const response = await axios.put(
      `/v1/account/changeStatus/${id}?type=open`
    );

    if (response.status == 200) {
      if (response.data.data) {
        updateItem(id, true);
        toast.success("Mở khóa thành công");
      } else {
        toast.error("Đã xảy ra lỗi!");
      }
    }
  };

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
          <h3 className="title-manager">Quản lí tài khoản Người dùng</h3>
          <div className="container-form-search ">
            <div className="mb-4 wrap-btn-add"></div>
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
                            <TableCell align="left">{row.username}</TableCell>
                            <TableCell align="left">
                              {row.patient.email}
                            </TableCell>
                            <TableCell align="left">
                              {row.patient.fullName}
                            </TableCell>

                            <TableCell align="left">
                              {row.status && (
                                <h6>
                                  <span class="badge badge-success">
                                    Đang hoạt động
                                  </span>
                                </h6>
                              )}

                              {!row.status && (
                                <h6>
                                  <span class="badge badge-danger">
                                    Bị khóa
                                  </span>
                                </h6>
                              )}
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
                              {row.status && (
                                <button
                                  className={"btn btn-danger"}
                                  title="Khóa"
                                  onClick={() => {
                                    handleBlock(row.id);
                                  }}
                                >
                                  <LockIcon></LockIcon>
                                </button>
                              )}

                              {!row.status && (
                                <button
                                  className={"btn btn-success"}
                                  title="Mở Khóa"
                                  onClick={() => {
                                    handleOpenBlock(row.id);
                                  }}
                                >
                                  <LockOpenIcon></LockOpenIcon>
                                </button>
                              )}
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
                <Modal.Title>Thông tin User</Modal.Title>
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
                    <span>{selectShow.patient.fullName}</span>
                  </div>

                  <div>
                    {" "}
                    <strong>Email:</strong>{" "}
                    <span>{selectShow.patient.email}</span>
                  </div>

                  <div>
                    {" "}
                    <strong>Tuổi:</strong> <span>{selectShow.patient.age}</span>
                  </div>

                  <div>
                    {" "}
                    <strong>Giới tính:</strong>{" "}
                    <span>{selectShow.patient.sex}</span>
                  </div>

                  <div>
                    {" "}
                    <strong>SĐT:</strong>{" "}
                    <span>{selectShow.patient.phoneNumber}</span>
                  </div>

                  <div>
                    {" "}
                    <strong>Vai trò:</strong> <span>{selectShow.role}</span>
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

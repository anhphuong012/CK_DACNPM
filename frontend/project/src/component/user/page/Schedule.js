import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

import { format, addDays, addMonths } from "date-fns";

import "../css/schedule.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Schedule() {
  // const params = useParams();
  // const keyword = params.id;

  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user == null) {
      navigate("/login");
    } else {
      const fetchPromise = fetch(`/v1/booking/patient/${user.id}`);

      fetchPromise
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          if (data.data != null) {
            setData(data.data);
            setLoad(false);
          }
        });
    }
  };

  console.log(data);

  const convertData = (date) => {
    var convert = date.split("-");
    console.log(convert);

    var myDate = new Date(
      parseInt(convert[0]),
      parseInt(convert[1] - 1),
      parseInt(convert[2])
    );
    return format(addDays(myDate, 0), "dd-MM-yyyy");
  };

  const getDateCurrent = () => {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    var myDate = new Date(
      parseInt(date.getFullYear()),
      parseInt(month),
      parseInt(day)
    );
    console.log("Current:" + format(addDays(myDate, 0), "dd-MM-yyyy"));
    return format(addDays(myDate, 0), "dd-MM-yyyy");
  };
  console.log(data);

  const cancel = async (id) => {
    setLoad(true);
    await axios({
      method: "put",
      url: `/v1/booking/cancel/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token").toString()}`,
      },
    }).then(function (response) {
      setLoad(false);
      if (response.status == 200) {
        // fetchData();
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
        toast.success("Hủy thành công!");
      } else {
        toast.error("Đã gặp lỗi");
      }
    });
  };

  return (
    <div>
      <Header></Header>
      <section className="bg-gray pd-t-20">
        <div className="container bg-slate-100 pd-20 pd-b-40">
          <h1 className="text-lg font-semibold mb-3">Lịch chưa/đang khám</h1>
          <div className="wrap__btn-cancel">
            <Link className="btn btn-outline-danger" to="/schedulecancel">
              Lịch đã/hủy khám
            </Link>
          </div>
          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table
              sx={{ minWidth: 650 }}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Thời gian đặt khám</strong>
                  </TableCell>
                  <TableCell align="left">
                    <strong>Bác sĩ</strong>
                  </TableCell>
                  <TableCell align="left">
                    <strong>Trạng thái</strong>
                  </TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>

              {load && (
                <Box sx={{ marginTop: "7rem", width: "100%", margin: "auto" }}>
                  <CircularProgress />
                </Box>
              )}

              {!load && (
                <TableBody>
                  {data != [] &&
                    data != undefined &&
                    data.map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {convertData(item.date)} {"  " + item.time} {}
                        </TableCell>
                        {item.doctor != undefined && item.doctor != null && (
                          <TableCell align="left">
                            {item.doctor.fullName}
                          </TableCell>
                        )}
                        <TableCell align="left">
                          {getDateCurrent() == convertData(item.date) ? (
                            <span class="badge bg-info">Đang khám </span>
                          ) : (
                            <span class="badge bg-primary">Chưa khám </span>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {getDateCurrent() != convertData(item.date) ? (
                            <button
                              onClick={() => cancel(item.id)}
                              className="btn btn-danger"
                            >
                              Hủy Lịch
                            </button>
                          ) : (
                            <></>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </div>
        <ToastContainer position="bottom-right" />
      </section>
      <Footer></Footer>
    </div>
  );
}

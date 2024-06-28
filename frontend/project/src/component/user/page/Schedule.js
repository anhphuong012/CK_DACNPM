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
import { toast } from "react-toastify";

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function Schedule() {
  // const params = useParams();
  // const keyword = params.id;

  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = (id) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
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
  };

  console.log(data);

  const convertData = (date) => {
    var convert = date.split("-");

    var myDate = new Date(
      parseInt(convert[2]),
      parseInt(convert[1]),
      parseInt(convert[0])
    );
    return format(addDays(myDate, 1), "dd-MM-yyyy");
  };

  const getDateCurrent = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    var myDate = new Date(
      parseInt(date.getFullYear()),
      parseInt(month),
      parseInt(day)
    );
    return format(addDays(myDate, 0), "dd-MM-yyyy");
  };

  const cancel = async (id) => {
    setLoad(true);
    await axios({
      method: "put",
      url: `/v1/booking/cancel/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(function (response) {
      setLoad(false);
      if (response.status == 200) {
        fetchData(1);
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
      </section>
      <Footer></Footer>
    </div>
  );
}

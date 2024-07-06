import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import "../css/schedule.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { addDays, format } from "date-fns";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function ScheduleCancel() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const fetchPromise = fetch(`/v1/booking/patient/done/${user.id}`);

    fetchPromise
      .then((response) => response.json())
      .then((data) => {
        if (data.data != null) {
          console.log(data);
          setData(data.data);
          setLoad(false);
        }
      });
  };

  const convertData = (date) => {
    var convert = date.split("-");

    var myDate = new Date(
      parseInt(convert[0]),
      parseInt(convert[1] - 1),
      parseInt(convert[2])
    );
    return format(addDays(myDate, 0), "dd-MM-yyyy");
  };
  return (
    <div>
      <Header></Header>
      <section className="bg-gray pd-t-20">
        <div className="container bg-slate-100 pd-20 pd-b-40">
          <h1 className="text-lg font-semibold mb-3">Lịch đã/hủy khám</h1>
          <div className="wrap__btn-cancel">
            <Link className="btn btn-outline-success" to={"/schedule"}>
              Lịch chưa/đang khám
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
                </TableRow>
              </TableHead>
              {load && (
                <Box sx={{ marginTop: "7rem", width: "100%", margin: "auto" }}>
                  <CircularProgress />
                </Box>
              )}

              {!load && (
                <TableBody>
                  {data.map((item, key) => (
                    <TableRow
                      key={key}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {convertData(item.date)} {"  " + item.time} {}
                      </TableCell>
                      <TableCell align="left">{item.doctorName}</TableCell>
                      <TableCell align="left">
                        {item.status == "Đã khám" ? (
                          <span class="badge bg-success">{item.status}</span>
                        ) : (
                          <span class="badge bg-danger">{item.status}</span>
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

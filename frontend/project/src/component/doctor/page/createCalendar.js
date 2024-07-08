import React, { useState, useEffect, useRef } from "react";
import Header from "./HeaderDoctor";
import "../css/calendar.css";
import "../css/createCalendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Footer from "./Footer";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import Tab from "@mui/material/Tab";
import TodayIcon from "@mui/icons-material/Today";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import {
  format,
  addDays,
  addMonths,
  set,
  isAfter,
  isBefore,
  parse,
} from "date-fns";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import Alert from "@mui/material/Alert";

import axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function Booking() {
  const [value, setValue] = useState(0);

  const [data, setData] = useState([]);

  const [isError, setIsError] = useState(false);

  const [listDay, setListDay] = useState([]);

  const [currentDate, setCurrentDate] = useState(new Date());

  const [dateChoose, setDateChoose] = useState(new Date());

  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);

  const [schedule, setSchedule] = useState(null);

  const [load, setLoad] = useState(true);

  const [show, setShow] = useState(false);

  const [selected, setSelected] = useState(null);

  const Card = (props) => {
    return (
      <div className="infoDiv">
        <div className="imgDoctor">
          <img src={props.props.avatar} alt={props.props.fullName} />
        </div>
        <div className="textInfo">
          <p className="nameDoctor mt-2">
            <b>Họ và tên:</b> {props.props.fullName}
          </p>
          <p className="ageDoctor mt-2">
            <b>Học vị:</b>{" "}
            {props.props.degree == "" ? "Bác sĩ" : props.props.degree}
          </p>
          <p className="emailDoctor mt-2">
            <b> Chuyên khoa:</b> {props.props.department}
          </p>
          <p className="phoneDoctor mt-2">
            <b>Nơi Làm Việc:</b> {props.props.placeOfwork}
          </p>
        </div>
      </div>
    );
  };

  const Banner = (props) => {
    return (
      <div className="imgBanner">
        <img src={props.props.imgBanner} />
      </div>
    );
  };
  //Gọi API lấy dữ liệu

  useEffect(() => {
    setListDay(getNextDays(7));
    setDoctors(JSON.parse(sessionStorage.getItem("user")));
    fetchData(JSON.parse(sessionStorage.getItem("user")).id);
    // fetchData(keyword);
  }, []);

  //Phương thức lấy 7 ngày tiếp theo
  const getNextDays = (numberOfDays) => {
    const days = [];
    for (let i = 1; i <= numberOfDays; i++) {
      days.push(format(addDays(currentDate, i), "dd-MM-yyyy"));
    }
    return days;
  };

  //Lay data

  const fetchData = async (doctorId) => {
    const list7Day = getNextDays(7);
    console.log(list7Day);
    var stringDate = "";
    list7Day.forEach((element, index) => {
      var split = element.split("-");
      var convertElement = split[2] + "-" + split[1] + "-" + split[0];
      if (index == list7Day.length - 1) {
        stringDate += convertElement;
      } else {
        stringDate += convertElement + ",";
      }
    });

    const response = await axios.get(
      `/v1/shedule/${doctorId}?date=${stringDate}`
    );

    if (response.status == 200) {
      if (response.data.data != null) {
        setSchedule(response.data.data);
        setLoad(false);
      }
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);

    setDateChoose(addDays(new Date(), newValue + 1));
    console.log(format(addDays(new Date(), newValue + 1), "dd-MM-yyyy"));
  };

  // useEffect(() => {
  //   fetchData(JSON.parse(sessionStorage.getItem("user")).id);
  // }, []);

  console.log(schedule);

  const convertDate = (date) => {
    const split = date.split("-");
    return split[2] + "-" + split[1] + "-" + split[0];
  };

  const ComponentOnOff = (props) => {
    var check = true;
    console.log(props.date);
    console.log(props.time);

    var update = schedule.filter((item) => {
      return (
        convertDate(item.date.toString()) == props.date &&
        parseInt(item.fromTime.split(":")[0], 10) <=
          parseInt(props.time.toString().split(":")[0], 10) &&
        parseInt(props.time.toString().split(":")[0], 10) <=
          parseInt(item.toTime.split(":")[0], 10)
      );
    });

    if (update.length > 0) {
      check = false;
      console.log(update[0].id);
    }

    console.log("Check:");

    if (check) {
      return (
        <button
          className={"btn btn-outline-danger"}
          onClick={() => {
            handleShow(props.time);
          }}
        >
          Khóa Lịch
        </button>
      );
    } else {
      return (
        <button
          className={"btn btn-outline-success"}
          onClick={() => {
            handleDelete(update[0].id);
          }}
        >
          Mở Lịch
        </button>
      );
    }
  };

  const createShedula = async () => {
    const convert = parseInt(selected.time.split(":")[0], 10) >= 13 ? 13 : 7;

    const toTime = convert == 7 ? "07:00" : "13:00";
    const fromTime = convert == 7 ? "11:00" : "17:00";

    const split = listDay[value].split("-");

    console.log("Convert:" + convert);

    const date = split[2] + "-" + split[1] + "-" + split[0];

    console.log("Date:" + date);

    const response = await fetch("/v1/shedule", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        date: date,
        fromTime: toTime,
        toTime: fromTime,
        doctorId: doctors.id,
        status: true,
      }),
    });

    const result = await response.json();

    if (result.status === "OK") {
      const returnData = result.data;
      console.log(returnData);
      setSchedule([...schedule, returnData]);
      toast.success("Khóa lịch thành công!");
      setShow(false);
      setSelected(null);
    } else if ((result.status = "failed")) {
      toast.error("Đã xảy ra lỗi vui lòng thử lại");
    }
  };

  const handleClose = () => {
    setShow(false);
    setSelected(null);
  };
  const handleShow = (time) => {
    setShow(true);
    setSelected({
      time: time,
    });
  };

  const handleDelete = async (id) => {
    const response = await fetch("/v1/shedule/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
    });

    const result = await response.json();

    if (result.status === "OK") {
      const returnData = result.data;
      if (returnData) {
        toast.success("Mở lại lịch khám thành công");
        const updateShedule = schedule.filter((item) => {
          return item.id != id;
        });
        setSchedule(updateShedule);
      } else {
        toast.error("Đã xảy ra lỗi");
      }
    } else if ((result.status = "failed")) {
      toast.error("Đã xảy ra lỗi vui lòng thử lại");
    }
  };

  return (
    <div className="container-wC">
      <Header></Header>
      {isError && (
        <div className={"status"}>
          <Alert severity="error">
            Có lỗi xảy ra vui lòng chọn thời gian khác.
          </Alert>
        </div>
      )}

      {!load && (
        <div className="bg-slate-100 pd-20">
          <div role="presentation" className="container mb-3">
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/home">
                Trang chủ
              </Link>
              <Typography color="text.primary">Bác sĩ</Typography>
            </Breadcrumbs>
          </div>
          <section className="container relative pd-10 bg-white border-radius-main pd-b-20">
            {data != [] && (
              <div className="d-flex border-head ">
                <div className="infor-doctor aligan-just">
                  <Card props={doctors}></Card>
                </div>
              </div>
            )}

            <br />
            <div className="time-register">
              <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="scrollable force tabs example"
                >
                  {listDay != null &&
                    listDay.map((item, index) => {
                      console.log("Index:" + index);
                      return (
                        <Tab
                          label={listDay != [] ? "Ngày " + item : ""}
                          className="mr-l-r-12"
                          {...a11yProps(index)}
                        />
                      );
                    })}
                </Tabs>

                {schedule != null && (
                  <div>
                    <TabPanel value={value} index={0}>
                      <div className="choose-time">
                        <div className="session">
                          <TodayIcon></TodayIcon>
                          <span className="title-time">Buổi sáng</span>

                          <div className="onOff">
                            <ComponentOnOff
                              date={listDay[value]}
                              time={"07:20"}
                            ></ComponentOnOff>
                          </div>
                        </div>
                        {/*<ChooseTime listHour={timeSlots}/>*/}

                        <div className="session border-top">
                          <TodayIcon></TodayIcon>
                          <span className="title-time">Buổi Chiều</span>

                          <div className="onOff">
                            <ComponentOnOff
                              date={listDay[value]}
                              time={"13:20"}
                            ></ComponentOnOff>
                          </div>
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                      <div className="choose-time">
                        <div className="session">
                          <TodayIcon></TodayIcon>
                          <span className="title-time">Buổi sáng</span>

                          <div className="onOff">
                            <ComponentOnOff
                              date={listDay[value]}
                              time={"07:20"}
                            ></ComponentOnOff>
                          </div>
                        </div>

                        <div className="session border-top">
                          <TodayIcon></TodayIcon>
                          <span className="title-time">Buổi Chiều</span>

                          <div className="onOff">
                            <ComponentOnOff
                              date={listDay[value]}
                              time={"13:20"}
                            ></ComponentOnOff>
                          </div>
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel value={value} index={2}>
                      <div className="choose-time">
                        <div className="session">
                          <TodayIcon></TodayIcon>
                          <span className="title-time">Buổi sáng</span>

                          <div className="onOff">
                            <ComponentOnOff
                              date={listDay[value]}
                              time={"07:20"}
                            ></ComponentOnOff>
                          </div>
                        </div>

                        <div className="session border-top">
                          <TodayIcon></TodayIcon>
                          <span className="title-time">Buổi Chiều</span>
                          <div className="onOff">
                            <ComponentOnOff
                              date={listDay[value]}
                              time={"13:20"}
                            ></ComponentOnOff>
                          </div>
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel value={value} index={3}>
                      <div className="choose-time">
                        <div className="session">
                          <TodayIcon></TodayIcon>
                          <span className="title-time">Buổi sáng</span>
                          <div className="onOff">
                            <ComponentOnOff
                              date={listDay[value]}
                              time={"07:20"}
                            ></ComponentOnOff>
                          </div>
                        </div>

                        <div className="session border-top">
                          <TodayIcon></TodayIcon>
                          <span className="title-time">Buổi Chiều</span>
                          <div className="onOff">
                            <ComponentOnOff
                              date={listDay[value]}
                              time={"13:20"}
                            ></ComponentOnOff>
                          </div>
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel value={value} index={4}>
                      <div className="choose-time">
                        <div className="session">
                          <TodayIcon></TodayIcon>
                          <span className="title-time">Buổi sáng</span>
                          <div className="onOff">
                            <ComponentOnOff
                              date={listDay[value]}
                              time={"07:20"}
                            ></ComponentOnOff>
                          </div>
                        </div>

                        <div className="session border-top">
                          <TodayIcon></TodayIcon>
                          <span className="title-time">Buổi Chiều</span>
                          <div className="onOff">
                            <ComponentOnOff
                              date={listDay[value]}
                              time={"13:20"}
                            ></ComponentOnOff>
                          </div>
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel value={value} index={5}>
                      <div className="choose-time">
                        <div className="session">
                          <TodayIcon></TodayIcon>
                          <span className="title-time">Buổi sáng</span>
                          <div className="onOff">
                            <ComponentOnOff
                              date={listDay[value]}
                              time={"07:20"}
                            ></ComponentOnOff>
                          </div>
                        </div>

                        <div className="session border-top">
                          <TodayIcon></TodayIcon>
                          <span className="title-time">Buổi Chiều</span>
                          <div className="onOff">
                            <ComponentOnOff
                              date={listDay[value]}
                              time={"13:20"}
                            ></ComponentOnOff>
                          </div>
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel value={value} index={6}>
                      <div className="choose-time">
                        <div className="session">
                          <TodayIcon></TodayIcon>
                          <span className="title-time">Buổi sáng</span>
                          <div className="onOff">
                            <ComponentOnOff
                              date={listDay[value]}
                              time={"07:20"}
                            ></ComponentOnOff>
                          </div>
                        </div>

                        <div className="session border-top">
                          <TodayIcon></TodayIcon>
                          <span className="title-time">Buổi Chiều</span>
                          <div className="onOff">
                            <ComponentOnOff
                              date={listDay[value]}
                              time={"13:20"}
                            ></ComponentOnOff>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                  </div>
                )}
              </Box>
            </div>
          </section>
        </div>
      )}
      <ToastContainer position="bottom-right" />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Nếu bạn khóa lịch các lịch được đặt trong khoảng thời gian này sẽ bị
          hủy? Bạn có chắc chắn muốn khóa?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Trở Lại
          </Button>
          <Button variant="danger" onClick={createShedula}>
            Khóa Lịch
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer></Footer>
    </div>
  );
}

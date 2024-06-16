import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
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
import dayjs from "dayjs";
import { format, addDays, addMonths } from "date-fns";
import { useNavigate } from "react-router-dom";

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

export default function Booking() {
  const [value, setValue] = useState(0);

  const [fixed, setFixed] = useState(true);

  const [data, setData] = useState([]);

  // const [time, setTime] = useState([]);

  // const [booking, setBooking] = useState([]);
  const [isError, setIsError] = useState(false);

  const [listDay, setListDay] = useState([]);
  const [listHourd, setListHourd] = useState([]);

  const [currentDate, setCurrentDate] = useState(new Date());

  const [dateChoose, setDateChoose] = useState(new Date());

  const navigate = useNavigate();
  const [selectedButtons, setSelectedButtons] = useState([]);

  const minute = ["00"];
  const hourMoning = ["07", "08", "09", "10"];
  const hourAfternoon = ["13", "14", "15", "16"];


  const [selectedButton, setSelectedButton] = useState(null);

  const params = useParams();
  const keyword = params.id;

  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Lê Văn Dũ",
      age: "35",
      phone: "0965649422",
      email: "duvan99@gmail.com",
      img: "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*",
    },
  ]);

  const [banners] = useState([
    {
      idBanner: 1,
      imgBanner: "https://hoadavietnam.com/wp-content/uploads/2017/11/dong-day-suc-khoe-banner-min.png",
    }
  ]);

  const Card = (props) => {
    return (
        <div className="infoDiv">
          <div className="imgDoctor">
            <img src={props.props.img}/>
          </div>
          <div className="textInfo">
            <p className="nameDoctor"><b>Họ và tên:</b> {props.props.name}</p>
            <p className="ageDoctor"><b>Tuổi:</b> {props.props.age}</p>
            <p className="emailDoctor"><b>Email:</b> {props.props.email}</p>
            <p className="phoneDoctor"><b>Số điện thoại:</b> {props.props.phone}</p>
          </div>
        </div>
    );
  };

  const Banner = (props) => {
    return (
        <div className="imgBanner">
          <img src={props.props.imgBanner}/>
        </div>
    )
  };
  //Gọi API lấy dữ liệu

  useEffect(() => {
    setListDay(getNextDays(7));
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



  //Xử lí sự kiện khi bấm đặt lịch khám
  const useHandleSubmit = () => {
    let valueBtn = selectedButton;
    // useEffect(() => {
    // POST request using fetch inside useEffect React hook
    if (selectedButton.length != 5) {
      valueBtn = "0" + selectedButton;
    }
    console.log("Length Values:" + selectedButton.length);
    const submit = async () => {


      const response = await fetch("/v1/shedule/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          doctorId: 3,
          date: listDay[value],
          time: selectedButtons,
        }),
      });

      const result = await response.json();

      if (result.status === "OK") {
        const returnData = result.data;
        console.log(returnData);
        // document.location.href = "/schedule";
        // navigate("/schedule");
      } else if ((result.status = "failed")) {
        setIsError(true);
        setSelectedButton(null);
      }
    };

    submit();

    console.log(listDay[value] + " " + valueBtn + ":00");
    console.log(listDay[value] + " " + selectedButtons);
    setSelectedButtons([]);
  };

  //Lay data

  //Xử lí sự kiện chỉ chọn đc 1 button thời gian
  const handleButtonClick = (buttonValue) => {
    setSelectedButton(buttonValue);
    setSelectedButtons((prevSelectedButtons) => [...prevSelectedButtons, buttonValue]);
  };

  //Xử lí sự kiện khi đổi tab ngày
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelectedButton(null);

    setDateChoose(addDays(new Date(), newValue));
    console.log(format(addDays(new Date(), newValue), "dd-MM-yyyy"));
  };

  useEffect(() => {
    const handlSRoll = () => {
      setFixed(window.scrollY <= 300);
    };

    window.addEventListener("scroll", handlSRoll);
  }, []);

  //Trả về component danh sách thời gian
  const ChooseTime = (props) => {
    console.log(props);
    return (
        <div>
          <div className="time">
            {props.listHour.map((hour) =>
                props.listmMnute.map((minute) => (
                    <button
                        type="radio"
                        name="time"
                        className={`btn btn-outline-primary btn-time ${
                            data.bookings!= undefined
                                ? data.bookings.map((value) => {
                                  if (
                                      value.time == hour + ":00" &&
                                      format(dateChoose, "dd-MM-yyyy") == value.date
                                  ) {
                                    console.log(hour + ":00"+ " disabled ");
                                    return " disabled ";
                                  }
                                  if (selectedButton === hour + ":00") {
                                    return " active ";
                                  }
                                })
                                : ""
                        }${
                            selectedButtons.includes(hour + ":" + minute) ? "active" : ""
                        }
                        `}
                        style={{
                          backgroundColor: selectedButtons.includes(hour + ":" + minute)? "blue" : "red",
                          color: "white",
                        }}
                        // onClick={() => handleButtonClick(hour + ":" + minute)}
                        onClick={() => handleButtonClick(hour + ":" + minute)}
                        // onClick={() => selectedButton}
                    >
                      {hour}:{minute} - {(parseInt(hour) + 1).toString() + ":" + minute}
                    </button>
                ))
            )}
          </div>

        </div>
    );
  };
  console.log(value);
  return (
      <div>
        <Header></Header>
        {isError && (
            <div className={"status"}>
              <Alert severity="error">
                Có lỗi xảy ra vui lòng chọn thời gian khác.
              </Alert>
            </div>
        )}

        <div className="bg-slate-100 pd-20">
          <div role="presentation" className="container mb-3">
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Trang chủ
              </Link>
              <Typography color="text.primary">Bác sĩ</Typography>
            </Breadcrumbs>
          </div>
          <section className="container relative pd-10 bg-white border-radius-main pd-b-20">
            {data != [] && (
                <div className="d-flex border-head ">
                  <div className="infor-doctor aligan-just">
                    {doctors.map((item) => (
                        <Card props={item}></Card>
                    ))}
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
                  <Tab
                      label={listDay != [] ? "Ngày " + listDay[0] : ""}
                      className="mr-l-r-12"
                      {...a11yProps(0)}
                  />
                  <Tab
                      label={listDay != [] ? "Ngày " + listDay[1] : ""}
                      className="mr-l-r-12"
                      {...a11yProps(1)}
                  />
                  <Tab
                      label={listDay != [] ? "Ngày " + listDay[2] : ""}
                      className="mr-l-r-12"
                      {...a11yProps(2)}
                  />
                  <Tab
                      label={listDay != [] ? "Ngày " + listDay[3] : ""}
                      className="mr-l-r-12"
                      {...a11yProps(3)}
                  />
                  <Tab
                      label={listDay != [] ? "Ngày " + listDay[4] : ""}
                      className="mr-l-r-12"
                      {...a11yProps(4)}
                  />
                  <Tab
                      label={listDay != [] ? "Ngày " + listDay[5] : ""}
                      className="mr-l-r-12"
                      {...a11yProps(5)}
                  />
                  <Tab
                      label={listDay != [] ? "Ngày " + listDay[6] : ""}
                      className="mr-l-r-12"
                      {...a11yProps(6)}
                  />
                </Tabs>
                {/** Chỗ này là Select button chọn thời gian
                 * Mỗi Tab Panel là đại diện cho một ngày
                 */}
                <TabPanel value={value} index={0}>
                  <div className="choose-time">
                    <div className="session">
                      <TodayIcon></TodayIcon>
                      <span className="title-time">Buổi sáng</span>
                    </div>
                    {/*<ChooseTime listHour={timeSlots}/>*/}
                    <ChooseTime
                        listHour={hourMoning}
                        listmMnute={minute}
                        date={listDay[value]}
                    ></ChooseTime>
                    <div className="session border-top">
                      <TodayIcon></TodayIcon>
                      <span className="title-time">Buổi Chiều</span>
                    </div>
                    <ChooseTime
                        listHour={hourAfternoon}
                        listmMnute={minute}
                        date={listDay[value]}
                    ></ChooseTime>
                  </div>
                </TabPanel>

                {/**Panel Ngày 2 */}
                <TabPanel value={value} index={1}>
                  <div className="choose-time">
                    <div className="session">
                      <TodayIcon></TodayIcon>
                      <span className="title-time">Buổi sáng</span>
                    </div>
                    <ChooseTime
                        listHour={hourMoning}
                        listmMnute={minute}
                        date={listDay[value]}
                    ></ChooseTime>
                    <div className="session border-top">
                      <TodayIcon></TodayIcon>
                      <span className="title-time">Buổi Chiều</span>
                    </div>
                    <ChooseTime
                        listHour={hourAfternoon}
                        listmMnute={minute}
                        date={listDay[value]}
                    ></ChooseTime>
                  </div>
                </TabPanel>

                {/* Panel ngày 3*/}
                <TabPanel value={value} index={2}>
                  <div className="choose-time">
                    <div className="session">
                      <TodayIcon></TodayIcon>
                      <span className="title-time">Buổi sáng</span>
                    </div>
                    <ChooseTime
                        listHour={hourMoning}
                        listmMnute={minute}
                        date={listDay[value]}
                    ></ChooseTime>
                    <div className="session border-top">
                      <TodayIcon></TodayIcon>
                      <span className="title-time">Buổi Chiều</span>
                    </div>
                    <ChooseTime
                        listHour={hourAfternoon}
                        listmMnute={minute}
                        date={listDay[value]}
                    ></ChooseTime>
                  </div>
                </TabPanel>

                {/**Panel Ngày 4 */}
                <TabPanel value={value} index={3}>
                  <div className="choose-time">
                    <div className="session">
                      <TodayIcon></TodayIcon>
                      <span className="title-time">Buổi sáng</span>
                    </div>
                    <ChooseTime
                        listHour={hourMoning}
                        listmMnute={minute}
                        date={listDay[value]}
                    ></ChooseTime>
                    <div className="session border-top">
                      <TodayIcon></TodayIcon>
                      <span className="title-time">Buổi Chiều</span>
                    </div>
                    <ChooseTime
                        listHour={hourAfternoon}
                        listmMnute={minute}
                        date={listDay[value]}
                    ></ChooseTime>
                  </div>
                </TabPanel>

                {/**Panel ngày 5 */}
                <TabPanel value={value} index={4}>
                  <div className="choose-time">
                    <div className="session">
                      <TodayIcon></TodayIcon>
                      <span className="title-time">Buổi sáng</span>
                    </div>
                    <ChooseTime
                        listHour={hourMoning}
                        listmMnute={minute}
                        date={listDay[value]}
                    ></ChooseTime>
                    <div className="session border-top">
                      <TodayIcon></TodayIcon>
                      <span className="title-time">Buổi Chiều</span>
                    </div>
                    <ChooseTime
                        listHour={hourAfternoon}
                        listmMnute={minute}
                        date={listDay[value]}
                    ></ChooseTime>
                  </div>
                </TabPanel>
                {/**Panel ngày 6 */}
                <TabPanel value={value} index={5}>
                  <div className="choose-time">
                    <div className="session">
                      <TodayIcon></TodayIcon>
                      <span className="title-time">Buổi sáng</span>
                    </div>
                    <ChooseTime
                        listHour={hourMoning}
                        listmMnute={minute}
                        date={listDay[value]}
                    ></ChooseTime>
                    <div className="session border-top">
                      <TodayIcon></TodayIcon>
                      <span className="title-time">Buổi Chiều</span>
                    </div>
                    <ChooseTime
                        listHour={hourAfternoon}
                        listmMnute={minute}
                        date={listDay[value]}
                    ></ChooseTime>
                  </div>
                </TabPanel>
                {/**Panel ngày 7 */}
                <TabPanel value={value} index={6}>
                  <div className="choose-time">
                    <div className="session">
                      <TodayIcon></TodayIcon>
                      <span className="title-time">Buổi sáng</span>
                    </div>
                    <ChooseTime
                        listHour={hourMoning}
                        listmMnute={minute}
                        date={listDay[value]}
                    ></ChooseTime>
                    <div className="session border-top">
                      <TodayIcon></TodayIcon>
                      <span className="title-time">Buổi Chiều</span>
                    </div>
                    <ChooseTime
                        listHour={hourAfternoon}
                        listmMnute={minute}
                        date={listDay[value]}
                    ></ChooseTime>
                  </div>
                </TabPanel>
              </Box>
            </div>
            {/** Button đặt khám bệnh. Nếu chưa chọn thời gian khám thì button sẽ bị disable */}
            <div
                className={`wrap_btn-booking-fixed container bg-white' 
                ${
                    fixed ? "btn-fixed" : "btn-relative"
                }`
            }
            >
              <button
                  type="button"
                  className={`btn btn-primary ${
                      selectedButton == null ? "disabled" : ""
                  }`}
                  onClick={useHandleSubmit}
              >
                Tạo Lịch
              </button>
            </div>
          </section>
        </div>
        <Footer></Footer>
      </div>
  );
}

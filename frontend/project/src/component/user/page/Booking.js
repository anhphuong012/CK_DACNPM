import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import "../css/booking.css";

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

  const [currentDate, setCurrentDate] = useState(new Date());

  const [dateChoose, setDateChoose] = useState(new Date());

  const navigate = useNavigate();

  const minute = ["00", "15", "30", "45"];
  const hourMoning = ["7", "8", "9", "10"];
  const hourAfternoon = ["13", "14", "15", "16"];

  const [selectedButton, setSelectedButton] = useState(null);

  const params = useParams();
  const keyword = params.id;

  //Gọi API lấy dữ liệu

  useEffect(() => {
    setListDay(getNextDays(7));
    fetchData(keyword);
  }, []);

  //Phương thức lấy 7 ngày tiếp theo
  const getNextDays = (numberOfDays) => {
    const days = [];
    for (let i = 1; i <= numberOfDays; i++) {
      days.push(format(addDays(currentDate, i), "dd-MM-yyyy"));
    }
    return days;
  };

  // const fetchData = (keyword) => {
  //   const fetchPromise = fetch(
  //     `/v1/booking/doctor/${keyword}?date=${getNextDays(7)[value]}`
  //   );

  //   fetchPromise
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("response:" + data.data);
  //       if (data.data != null) {
  //         setData(data.data);
  //       }
  //     });
  // };
  // console.log(listDay);
  //Phương thức lấy dữ liệu
  const fetchData = async (keyword) => {
    const list7Day = getNextDays(7);
    console.log(list7Day);
    var stringDate = "";
    list7Day.forEach((element, index) => {
      if (index == list7Day.length - 1) {
        stringDate += element;
      } else {
        stringDate += element + ",";
      }
    });

    console.log("String:" + stringDate);
    const response = await axios.get(
      `/v1/booking/doctor/${keyword}?date=${stringDate}`
    );

    if (response.status == 200) {
      if (response.data.data != null) {
        setData(response.data.data);
        console.log("change data");
      }
    }
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
    if (sessionStorage.getItem("user") != null) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const submit = async () => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        // const requestOptions = {
        //   method: "POST",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     doctorId: "1",
        //     patientId: "0",
        //     date: listDay[value] + selectedButton + ":00",
        //   }),
        // };
        // fetch("/v1/booking/add", requestOptions)
        //   .then((response) => response.json())
        //   .then((data) => console.log(data));

        const response = await fetch("/v1/booking/add", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({
            doctorId: keyword,
            patientId: user.id,
            date: listDay[value],
            time: selectedButton,
          }),
        });

        const result = await response.json();

        if (result.status === "OK") {
          const returnData = result.data;
          console.log(returnData);
          // document.location.href = "/schedule";
          navigate("/schedule");
        } else if ((result.status = "failed")) {
          setIsError(true);
          setSelectedButton(null);
        }
      };

      submit();
    } else {
      navigate("/login");
    }

    console.log(listDay[value] + " " + valueBtn + ":00");
  };

  //Lay data

  //Xử lí sự kiện chỉ chọn đc 1 button thời gian
  const handleButtonClick = (buttonValue) => {
    // console.log(data.bookings != []);
    // console.log(buttonValue);
    // if (data.bookings.length > 0) {
    //   data.bookings.forEach((item) => {
    //     // console.log("DateItem:" + item.date);
    //     // console.log(
    //     //   "DateItemConfig:" + listDay[value] + " " + buttonValue + ":00"
    //     // );

    //     console.log(
    //       "Check:" +
    //         (listDay[value] + " " + "0" + buttonValue + ":00" == item.date + "")
    //     );
    //     // if (item.date == listDay[value] + " " + "0" + buttonValue + ":00") {
    //     //   return false;
    //     // } else {
    //     //   return true;
    //     // }
    //     console.log("Length:" + buttonValue.length);
    //     var check = false;
    //     if (buttonValue.length != 5) {
    //       buttonValue = "0" + buttonValue;
    //       check = true;
    //     }
    //     if (listDay[value] + " " + buttonValue + ":00" == item.date + "") {
    //       alert("Giờ đã có người đăng kí");
    //       console.log("Đã có người đăng kí");
    //       setSelectedButton(null);
    //     } else {
    //       if (check) {
    //         buttonValue = buttonValue.substring(1, buttonValue.length);
    //         console.log("Sub" + buttonValue.substring(1, buttonValue.length));
    //       }
    //       console.log("Button:" + buttonValue);
    //       setSelectedButton(buttonValue);
    //     }
    //   });
    // } else {
    //   console.log("k co book");
    //   setSelectedButton(buttonValue);
    // }
    setSelectedButton(buttonValue);
    setIsError(false);
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
                className={`btn btn-outline-primary btn-time
                 ${
                   data.bookings != undefined &&
                   data.bookings.map((value) => {
                     if (
                       value.time == hour + ":" + minute &&
                       format(dateChoose, "dd-MM-yyyy") == value.date
                     ) {
                       console.log(hour + ":" + minute + " disabled ");
                       return " disabled ";
                     }
                   })
                 } 
                ${selectedButton === hour + ":" + minute ? " active " : ""} 
                              
                 `}
                onClick={() => handleButtonClick(hour + ":" + minute)}
              >
                {hour} : {minute} -{" "}
                {minute == "45"
                  ? (parseInt(hour) + 1).toString() + " : 00"
                  : hour + " : " + (parseInt(minute) + 15).toString()}
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
              <div className="image-doctor p-10">
                <img
                  src={data.avatar}
                  class="rounded-circle"
                  alt="Cinque Terre"
                ></img>
              </div>
              <div className="infor-doctor aligan-just">
                <h1>
                  {data.degree} Bác sĩ chuyên khoa {data.fullName}{" "}
                </h1>
                <div className="d-flex" style={{ alignItems: "center;" }}>
                  <span className="text-sm text-gray-600 ">Chuyên khoa: </span>
                  <span className="pd-10-l-r text-black font-medium">
                    {data.department}
                  </span>
                </div>

                <div
                  className="d-flex"
                  style={{ alignItems: "center;", paddingTop: "10px" }}
                >
                  <span className="text-sm text-gray-600 ">Nơi công tác: </span>
                  <span className="pd-10-l-r text-black font-medium">
                    {data.placeOfwork}
                  </span>
                </div>
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
                {/* {listDay != [] &&
                  listDay.map((day, index) => {
                    <div key={index}>
                      <Tab
                        label={day}
                        className="mr-l-r-12"
                        {...a11yProps(index)}
                      />
                      ;
                    </div>;
                    console.log("Day:" + day);
                  })} */}
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
            className={`wrap_btn-booking-fixed container bg-white ${
              fixed ? "btn-fixed" : "btn-relative"
            }`}
          >
            <button
              type="button"
              className={`btn btn-primary ${
                selectedButton == null ? "disabled" : ""
              }`}
              onClick={useHandleSubmit}
            >
              Đặt khám ngay
            </button>
          </div>
          <div
            className="aligan-just mt-5 history pd-20"
            style={{ padding: "30px" }}
          >
            <h1 className="text-lg font-semibold"> Giới thiệu</h1>
            <p>{data.descreption}</p>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
}

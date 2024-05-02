/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import TabBar from "./tabBar";
import DatePickerComponent from "./datePicker";

// Css
import "../css/createCalendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


export default function InfoDoctor() {

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

  // Chọn lịch
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMorningSlots, setSelectedMorningSlots] = useState([]);
  const [selectedAfternoonSlots, setSelectedAfternoonSlots] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  


  const handleDateSelect = (date) => {
    setSelectedDate(null);
    setSelectedMorningSlots([]);
    setSelectedAfternoonSlots([]);
    setSelectedTimeSlots([]);
  };

  const handleSlotSelect = (slot) => {

    setSelectedTimeSlots((prevSlots) =>
      prevSlots.includes(slot) ? prevSlots.filter((s) => s !== slot) : [...prevSlots, slot]
    );
  };

  const handleCreateSchedule = () => {
    setSelectedDate();
    setSelectedMorningSlots([]);
    setSelectedAfternoonSlots([]);
    
    // Gửi dữ liệu lịch tới API
    console.log("Ngày đã chọn:", selectedDate);
    console.log("Khung giờ sáng đã chọn:", selectedMorningSlots);
    console.log("Khung giờ chiều đã chọn:", selectedAfternoonSlots);
    console.log("Các khung giờ đã chọn:", selectedTimeSlots);
  };

  const [morningTimeSlots, setMorningTimeSlots] = useState([
    "07:00 - 07:15",
    "07:15 - 07:30",
    "07:30 - 07:45",
    "07:45 - 08:00",
    "08:00 - 08:15",
    "08:15 - 08:30",
    "08:30 - 08:45",
    "08:45 - 09:00",
    "09:00 - 09:15",
    "09:15 - 09:30",
    "09:30 - 09:45",
    "09:45 - 10:00",
    "10:00 - 10:15",
    "10:15 - 10:30",
    "10:30 - 10:45",
    "10:45 - 11:00"
  ]);

  const afternoonTimeSlots = [
    "13:00 - 13:15",
    "13:15 - 13:30",
    "13:30 - 13:45",
    "13:45 - 14:00",
    "14:00 - 14:15",
    "14:15 - 14:30",
    "14:30 - 14:45",
    "14:45 - 15:00",
    "15:00 - 15:15",
    "15:15 - 15:30",
    "15:30 - 15:45",
    "15:45 - 16:00",
    "16:00 - 16:15",
    "16:15 - 16:30",
    "16:30 - 16:45",
    "16:45 - 17:00"
  ];

  

  return (
    <div className="content">
      <TabBar/>
      <div className="mainInfo">
        <div className="mainDiv">
          <div className="titlePage">
            <p className="titleHome">
              <a href="/">Trang Chủ </a><p className="p-symbol">/</p><a href="/create-calendar"> Tạo Lịch Khám</a>
            </p>  
          </div>
          <div className="createCalendar">
            <div className="infoDoctor">
              {doctors.map((item) => (
                <Card props={item}></Card>
              ))}
            </div> 
            <div className="createCalendars">
              <div className="inputCalendar">
                <div className="chooseDate">
                  <p className="titleInput">Ngày</p>
                  <DatePickerComponent onSelect={handleDateSelect}/>
                </div>
                <div className="morningTime">
                  <p className="titleInput">Buổi sáng</p>
                  <ul className="timeDiv">
                    {morningTimeSlots.map((slot, index) => (
                      <button
                        key={index}
                        className={`listTime ${selectedTimeSlots.includes(slot) ? 'selected' : ''}`}
                        onClick={() => handleSlotSelect(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </ul>
                </div>
                
                <div className="eveningTime">
                  <p className="titleInput">Buổi chiều</p>
                  <ul className="timeDiv">
                    {afternoonTimeSlots.map((slot, index) => (
                      <button
                        key={index}
                        className={`listTime ${selectedTimeSlots.includes(slot) ? 'selected' : ''}`}
                        onClick={() => handleSlotSelect(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </ul>
                </div>
                <div className="submitButton">
                  <input
                  type="submit"
                  value="Tạo Lịch"
                  className="createCalendarButton"
                  onClick={handleCreateSchedule}
                  />
                </div>


              </div>

              <div className="bannerDiv">
                {banners.map((item) => (
                  <Banner props={item}></Banner>
                ))}
              </div>
            </div> 
          </div>
        </div>
      </div>
    </div>
    
  );
}

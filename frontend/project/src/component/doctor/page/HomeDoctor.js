import React, { useState, useEffect } from "react";
import HeaderDoctor from "./HeaderDoctor";
import FooterDoctor from "../../user/page/Footer";
import "../css/homeDoctor.css";
import BrgDoctor from "../img/bgr2.png";
import DateTime from "./DateTime";
import axios from "axios";
import { format, addDays } from "date-fns";
import { useNavigate } from "react-router-dom";

const STATUS = {
  BOOKED: 1,
  CANCELED: 0,
};

const AppointmentItem = ({ date, time, patientName, phone, status }) => {
  const statusText = status === STATUS.BOOKED ? "booked" : "canceled";
  return (
    <li className="meBo_list-item">
      <div className="meBo_item-left">
        <div className="meBo_items">
          <p className="meBo-date meBo-text text-notMargin">Ngày hẹn:</p>
          <p className="meBo_date-text meBo-text text-notMargin">
            {format(new Date(date), "dd/MM/yyyy")}
          </p>
        </div>
        <div className="meBo_items">
          <p className="meBo-time meBo-text text-notMargin">Thời gian hẹn:</p>
          <p className="meBo_time-text meBo-text text-notMargin">{time}</p>
        </div>
        <div className="meBo_items">
          <p className="meBo-namePatients meBo-text text-notMargin">
            Tên bệnh nhân:
          </p>
          <p className="meBo_namePatients-text meBo-text text-notMargin">
            {patientName}
          </p>
        </div>
        <div className="meBo_items">
          <p className="meBo-numberPhone meBo-text text-notMargin">
            Số điện thoại:
          </p>
          <p className="meBo_numberPhone-text meBo-text text-notMargin">
            {phone}
          </p>
        </div>
      </div>
      <div className="meBo_item-right">
        <div className="meBo_items meBo_blk">
          <p className="meBo_blk-status meBo-text text-notMargin">Trạng thái:</p>
        </div>
        <div className="meBo_items-status">
          <div className={`btn_status btn_status-${statusText}`}>
            {status === STATUS.BOOKED ? "Đã đặt" : "Đã bị hủy"}
          </div>
        </div>
      </div>
    </li>
  );
};

function HomeDoctor() {
  const [visibleRows, setVisibleRows] = useState(2);
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const user = sessionStorage.getItem("user");

      if (!user) {
        navigate("/login");
      } else {
        try {
          const doctor = JSON.parse(user);
          const response = await axios.get(`/v1/booking/doctor/${doctor.id}`);
          
          if (response.data.status === "success") {
            const currentDateTime = new Date();
            const validAppointments = response.data.data.bookings.filter(
              (appointment) => {
                const appointmentDateTime = new Date(
                  `${appointment.date} ${appointment.time}`
                );
                return appointmentDateTime > currentDateTime;
              }
            );
            setAppointments(validAppointments);
          } else {
            console.error("Failed to fetch appointments:", response.data.message);
          }
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      }
    };

    fetchAppointments();
  }, [navigate]);

  const handleShowMore = () => {
    if (visibleRows * 3 < appointments.length) {
      setVisibleRows(visibleRows + 2);
    }
  };

  const getNextSevenDays = () => {
    const today = new Date();
    return Array.from({ length: 8 }, (_, i) => addDays(today, i));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filteredAppointments = appointments.filter((appointment) =>
    format(new Date(appointment.date), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
  );

  return (
    <div id="blk_container-doctor">
      <HeaderDoctor />
      <div id="container-doctor">
        <div className="bgr">
          <div className="bgr_img">
            <img src={BrgDoctor} alt="ảnh nền" className="bgr_img-doctor" />
          </div>
          <div className="slogan">
            <p className="slogan_text-big slogan_text">
              Tạo lịch khám dễ dàng,
            </p>
            <p className="slogan_text-small slogan_text">
              Kết nối với bệnh nhân hiệu quả hơn
            </p>
          </div>
        </div>
        <div id="container-content">
          <div className="row_meBo">
            <div className="rowMeBo">
              <a href="/watch-calendar" className="rowMeBo_title">
                <p className="rowMeBo_title-text">Lịch được hẹn khám</p>
              </a>
              <div className="rowMeBo_dateTime">
                <DateTime />
              </div>
            </div>
            <div className="rowMeBo_tabs">
              {getNextSevenDays().map((date) => (
                <button
                  key={date}
                  className={`tab_button ${
                    format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handleDateChange(date)}
                >
                  {format(date, "dd/MM/yyyy")}
                </button>
              ))}
            </div>
            <div className="rowMeBo_block">
              <div className="rowMeBo_block-list">
                {filteredAppointments.length === 0 ? (
                  <div className="blk-noAppointments">
                    <p className="no-appointments">Không có lịch hẹn nào</p>
                  </div>
                ) : (
                  <ul className="meBo_list">{
                    filteredAppointments
                      .slice(0, visibleRows * 3)
                      .map((appointment) => (
                        <AppointmentItem
                          key={appointment.id}
                          date={appointment.date}
                          time={appointment.time}
                          patientName={appointment.patient.fullName}
                          phone={appointment.patient.phoneNumber}
                          status={appointment.status}
                        />

                      ))
                    }
                  </ul>              
                )}
                
                {visibleRows * 3 < filteredAppointments.length && (
                  <div className="btn_meBo">
                    <button
                      className="btn_meBo-seeMore"
                      onClick={handleShowMore}
                    >
                      Xem thêm
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterDoctor />
    </div>
  );
}

export default HomeDoctor;

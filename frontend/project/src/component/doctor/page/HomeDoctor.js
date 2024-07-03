import React, { useState } from 'react';
import HeaderDoctor from './HeaderDoctor';
import FooterDoctor from '../../user/page/Footer';
import '../css/homeDoctor.css';
import BrgDoctor from '../img/bgr2.png';
import DateTime from './DateTime';

const AppointmentItem = ({ date, time, patientName, phone, status }) => (
  <li className='meBo_list-item'>
    <div className='meBo_item-left'>
      <div className='meBo_items'>
        <p className='meBo-date meBo-text text-notMargin'>Ngày hẹn:</p>
        <p className='meBo_date-text meBo-text text-notMargin'>{date}</p>
      </div>
      <div className='meBo_items'>
        <p className='meBo-time meBo-text text-notMargin'>Thời gian hẹn:</p>
        <p className='meBo_time-text meBo-text text-notMargin'>{time}</p>
      </div>
      <div className='meBo_items'>
        <p className='meBo-namePatients meBo-text text-notMargin'>Tên bệnh nhân:</p>
        <p className='meBo_namePatients-text meBo-text text-notMargin'>{patientName}</p>
      </div>
      <div className='meBo_items'>
        <p className='meBo-numberPhone meBo-text text-notMargin'>Số điện thoại:</p>
        <p className='meBo_numberPhone-text meBo-text text-notMargin'>{phone}</p>
      </div>
    </div>
    <div className='meBo_item-right'>
      <div className='meBo_items meBo_blk'>
        <p className='meBo_blk-status meBo-text text-notMargin'>Trạng thái:</p>
      </div>
      <div className='meBo_items-status'>
        <div className={`btn_status btn_status-${status.toLowerCase()}`}>{status}</div>
      </div>
    </div>
  </li>
);

function HomeDoctor() {
  const [visibleRows, setVisibleRows] = useState(2);
  const appointments = [
    {
      date: '03/07/2024',
      time: '7:04',
      patientName: 'Trần Lộc',
      phone: '0379383465',
      status: 'Đã đặt',
    },
    {
      date: '03/07/2024',
      time: '7:04',
      patientName: 'Trần Lộc',
      phone: '0379383465',
      status: 'Đã bị hủy',
    },
    {
      date: '03/07/2024',
      time: '7:04',
      patientName: 'Trần Lộc',
      phone: '0379383465',
      status: 'Đã bị hủy',
    },
    {
      date: '03/07/2024',
      time: '7:04',
      patientName: 'Trần Lộc',
      phone: '0379383465',
      status: 'Đã bị hủy',
    },
    {
      date: '03/07/2024',
      time: '7:04',
      patientName: 'Trần Lộc',
      phone: '0379383465',
      status: 'Đã bị hủy',
    },
    {
      date: '03/07/2024',
      time: '7:04',
      patientName: 'Trần Lộc',
      phone: '0379383465',
      status: 'Đã bị hủy',
    },
    {
      date: '03/07/2024',
      time: '7:04',
      patientName: 'Trần Lộc',
      phone: '0379383465',
      status: 'Đã bị hủy',
    },
    {
      date: '03/07/2024',
      time: '7:04',
      patientName: 'Trần Lộc',
      phone: '0379383465',
      status: 'Đã bị hủy',
    },
    
  ];

  const handleShowMore = () => {
    if (visibleRows < appointments.length / 3) {
      setVisibleRows(visibleRows + 2);
    } else {
      window.location.href = '/watch';
    }
  };

  return (
    <div id='blk_container-doctor'>
      <HeaderDoctor/>
      <div id='container-doctor'>
        <div className='bgr'>
          <div className='bgr_img'>
            <img src={BrgDoctor} alt='ảnh nền' className='bgr_img-doctor'/>
          </div>
          <div className='slogan'>
            <p className='slogan_text-big slogan_text'>Tạo lịch khám dễ dàng,</p>
            <p className='slogan_text-small slogan_text'>Kết nối với bệnh nhân hiệu quả hơn</p>
          </div>
        </div>
        <div id='container-content'>
          <div className='row_meBo'>
            <div className='rowMeBo'>
              <a href='/watch-calendar' className='rowMeBo_title'>
                <p className='rowMeBo_title-text'>
                  Lịch được hẹn khám
                </p>
              </a>
              <div className='rowMeBo_dateTime'>
                <DateTime/>
              </div>
            </div>
            <div className='rowMeBo_block'>
              <div className='rowMeBo_block-list'>
                <ul className='meBo_list'>
                  {appointments.slice(0, visibleRows * 3).map((appointment, index) => (
                    <AppointmentItem
                      key={index}
                      date={appointment.date}
                      time={appointment.time}
                      patientName={appointment.patientName}
                      phone={appointment.phone}
                      status={appointment.status}
                    />
                  ))}
                </ul>
                <div className='btn_meBo'>
                  <button className='btn_meBo-seeMore' onClick={handleShowMore}>
                    Xem thêm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterDoctor/>
    </div>
  );
}

export default HomeDoctor;

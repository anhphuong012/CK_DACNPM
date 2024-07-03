import React from 'react';
import '../css/headerDoctor.css';
import LogoDoctor from '../img/logo2.png';
import AvatarDoctor from '../img/doctorAvt.png';
import axios from "axios";


function HeaderDoctor() {
  

  // const fetchData = async () => {
  //   try {
  //     const user = JSON.parse(sessionStorage.getItem("user"));

  //     const response = await axios.get(`/v1/patients/patient/${user.id}`);

  //     if (response.status == 200) {
  //       if (response.data.data != null) {
  //         setData(response.data.data);
  //         setName(response.data.data.fullName);
  //         setSex(response.data.data.sex);
  //         setEmail(response.data.data.email);
  //         setPhone(response.data.data.phoneNumber);
  //         setAge(response.data.data.age);
  //         console.log("change data");
  //       }
  //     }
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);


  return (
    <header id='header-doctor'>
      <div id='col_logo'>
        <a href='/home' className='logo_header'>
          <img src={LogoDoctor} alt='Logo Header Doctor' className='logo_header-img'/>
        </a>
      </div>
      <div id='col_nav'>
        <div className='col_menu'>
          <a href='/watch-calendar'><p className='col_menu-text'>Xem lịch được đặt</p></a>
          <a href='/create-calendar'><p className='col_menu-text'>Tạo lịch</p></a>
          {/* <p></p>
          <p></p> */}
        </div>
        <div className='col_user'>
          <div className='avt'>
            <img src={AvatarDoctor} alt='AvtDoctor' className='avt_doctor'/>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderDoctor;
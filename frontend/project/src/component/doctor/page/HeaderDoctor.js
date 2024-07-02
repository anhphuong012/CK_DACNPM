import React from 'react';
import '../css/headerDoctor.css';
import LogoDoctor from '../img/logo2.png';
import Avatar from "@mui/material/Avatar";


function HeaderDoctor() {
  

  return (
    <header id='header-doctor'>
      <div id='col_logo'>
        <a href='/home' className='logo_header'>
          <img src={LogoDoctor} alt='Logo Header Doctor' className='logo_header-img'/>
        </a>
      </div>
      <div id='col_nav'>
        <div className='col_menu'>
          <p>Lịch được đặt</p>
          <p>Tạo lịch</p>
          <p></p>
          <p></p>
        </div>
        <div className='col_user'>

        </div>
      </div>
    </header>
  )
}

export default HeaderDoctor;
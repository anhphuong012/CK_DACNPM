import React from 'react';
import '../css/forgotPassword.css';
import BackIcon from '../img/back.svg';

function ForgotPass() {
  return (
    <div id='forgot-password'>
      <div className='box_forPass'>
        <a className='forPass_back' href='/login'>
          <img src={BackIcon} alt='back home' className='forPass_back-icon'/>
        </a>
        <p className='forPass-title'>Quên mật khẩu</p>
        <form className='forPass-form'>
          <input
            type='text'
            placeholder='Nhập email hoặc số điện thoại'
            className='forPass-input'
          />
          <button className='forPass-btn'>
            Tiếp tục
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPass;

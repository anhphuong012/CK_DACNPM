import React, { useState, Component } from "react";
import "../css/tabBar.css";
import logo from "../img/logo.svg";
import menu from "../img/menu.png";
import xmenu from "../img/xmenu.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/react-fontawesome"

export default function TabBar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  }

  return (
    <header class="hearderBar">
      <div className="bar">
        <a href="/"><img class="img-logo" src={logo} alt="logo"/></a>
      </div>
      <div className="menuBar">
        <img class="img-menu1" src={isMenuOpen ? xmenu : menu} alt="Menu Icon" onClick={toggleMenu}/>
        <ul className={`menuList ${isMenuOpen ? "show" : ""}`}>
          <li className="list-items"><a className="lists" href="/profile-doctor">Thông tin cá nhân</a></li>
          <li className="list-items"><a className="lists" href="/create-calendar">Tạo lịch khám</a></li>
          <li className="list-items"><a className="lists" href="/watch-calendar">Xem lịch khám</a></li>
        </ul>
      </div>
    </header>
  );
}

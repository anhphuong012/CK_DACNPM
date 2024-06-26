/* eslint-disable jsx-a11y/alt-text */
import React, { useState, Component, useEffect } from "react";
import "../css/header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LogoutIcon from "@mui/icons-material/Logout";

import logoPan from "../img/Logo_PanBee_png.png";

import Tooltip from "@mui/material/Tooltip";
export default function Headers() {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // useEffect(() => {
  //   if (sessionStorage.getItem("user") != null) {
  //     setIsLogin(true);
  //     console.log(sessionStorage.getItem("user"))
  //     // setUserName(user.fullName)
  //   } else {
  //     setIsLogin(false);
  //   }
  // }, []);

  useEffect(() => {
    // Lấy thông tin người dùng từ sessionStorage
    const user = sessionStorage.getItem("user");
    if (user) {
      // Parse JSON để lấy đối tượng người dùng
      const userData = JSON.parse(user);
      setIsLogin(true);
      // Đặt tên người dùng từ đối tượng đã parse vào state userName
      setUserName(userData.fullName);
    } else {
      setIsLogin(false);
    }
  }, []);
  

  

  const handleForward = (url) => {
    setAnchorEl(null);
    window.location.href = url;
  };

  return (
    <div className="border-b">
      <header class="container d-flex justify-content-between mt-20 ">
        <div class="logo">
          <a href="/">
            <img class="img-logo" src={logoPan} />
          </a>
        </div>

        <div className="nav">
          <a href="/" className="nav-link">
            Trang chủ
          </a>
        </div>
        {!isLogin && (
          <div id="block-isNotLogin">
            <a type="button" href="/register" class="btn btn-outline-primary btn_register-home">
              Đăng ký
            </a>
            <a type="button" href="/login" class="btn btn-outline-primary">
              Đăng nhập
            </a>
          </div>
        )}

        {isLogin && (
          <div>
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Cài đặt tài khoản">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    color="success"
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>{userName.charAt(0)}</Avatar>
                  </IconButton>
                </Tooltip>
                <div className="name-header">
                  <p className="user_name-header">{userName}</p>
                </div>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => handleForward("/profile")}>
                  <ListItemIcon>
                    <AccountBoxIcon></AccountBoxIcon>
                  </ListItemIcon>{" "}
                  Thông tin
                </MenuItem>
                <MenuItem onClick={() => handleForward("/schedule")}>
                  <ListItemIcon>
                    <EventNoteIcon></EventNoteIcon>
                  </ListItemIcon>{" "}
                  Lịch đã đặt
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    sessionStorage.clear();
                    window.location.href = "/";
                  }}
                >
                  <ListItemIcon>
                    <LogoutIcon></LogoutIcon>
                  </ListItemIcon>
                  Đăng Xuất
                </MenuItem>
              </Menu>
            </React.Fragment>
          </div>
        )}
      </header>
    </div>
  );
}

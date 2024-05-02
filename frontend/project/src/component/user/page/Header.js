/* eslint-disable jsx-a11y/alt-text */
import React, { useState, Component } from "react";
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
  const [isLogin, setIsLogin] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <div>
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
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    color="success"
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                  </IconButton>
                </Tooltip>
                <div className="name-header">
                  <p>Nguyễn Ngọc Phương</p>
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
                <MenuItem onClick={handleClose}>
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

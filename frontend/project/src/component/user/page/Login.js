import React, { useState, Component } from "react";
import Header from "./Header";
import Login from "../img/Login.png";
import "../css/login.css";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Login_pan from "../img/login_pan.png";
import "axios";


export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    await axios({
      method: "post",
      maxBodyLength: Infinity,
      url: "/v1/account/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        username: phone,
        password: password,
      }),
    }).then(function (response) {
      console.log(response);
      if (response.status == 200) {
        sessionStorage.setItem("token", response.data.data.token);
        if (response.data.data.user.role == "user") {
          var user = response.data.data.user.patient;
          sessionStorage.setItem("user", JSON.stringify(user));
          document.location.href = "/";
        } else if (response.data.data.role == "admin") {
          navigate("/admin/manage-user");
        } else if (response.data.data.user.role === "doctor") {
          const user = response.data.data.user.doctor;
          sessionStorage.setItem("user", JSON.stringify(user));
          navigate("/home");
        } else {
          var user = response.data.data.user.doctor;
          sessionStorage.setItem("user", JSON.stringify(user));
          document.location.href = "/profile-doctors";
        }
      } else if (response.status == 204) {
        toast.error("Sai tài khoản hoặc mật khẩu");
      } else if (response.status == 203) {
        toast.error("Tài khoản đã bị khóa");
      } else {
        toast.error("Đã gặp lỗi");
      }
    });
  };

  return (
    <div>
      <Header></Header>
      <div className="container-fuid bg-gray">
        <section className="container">
          <div className="d-flex row">
            <div className="block-left col-6">
              <img src={Login_pan}></img>
            </div>
            <div className="block-right col-6">
              <div className="bg-white w-80">
                <h1>Đăng nhập</h1>
                <div class="mb-3 mt-3 text-just">
                  <label for="phone" class="form-label">
                    Nhập số điện thoại:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="phone"
                    placeholder="Số điện thoại"
                    name="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </div>
                <div class="mb-3 text-just">
                  <label for="pwd" class="form-label">
                    Mật khẩu:
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="pwd"
                    placeholder="Nhập mật khẩu"
                    name="pswd"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="check1"
                      name="option1"
                      value="something"
                    />
                    <label class="form-check-label">Ghi nhớ tài khoản</label>
                  </div>
                  <div>
                    <a href="/forgot-password" className="forget-pass">
                      Quên mật khẩu?
                    </a>
                  </div>
                </div>
                <div className="wrap-btn-login">
                  <button className="btn btn-primary btn-login" onClick={login}>
                    Đăng nhập
                  </button>
                </div>

                <div className="mt-4">
                  Chưa có tài khoản?{" "}
                  <Link className="forget-pass" to="/register">
                    Đăng ký ngay
                  </Link>
                </div>
              </div>
            </div>
            <ToastContainer position="bottom-right" />
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
}

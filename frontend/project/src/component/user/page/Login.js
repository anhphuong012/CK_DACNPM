import React, { useState, Component } from "react";
import Header from "./Header";
import Login from "../img/Login.png";
import "../css/login.css";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";

import Login_pan from "../img/login_pan.png";
export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

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
                    <a href="" className="forget-pass">
                      Quên mật khẩu?
                    </a>
                  </div>
                </div>
                <div className="wrap-btn-login">
                  <button className="btn btn-primary btn-login">
                    Đăng nhập
                  </button>
                </div>

                <div className="mt-4">
                  Chưa có tài khoản ?{" "}
                  <Link className="forget-pass" to="/register">
                    Đăng kí ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
}

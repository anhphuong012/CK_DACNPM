import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import "../css/register.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Register() {
  // Các trạng thái để lưu trữ thông tin đầu vào của người dùng
  const [fullName, setFullName] = useState("");
  const [repass, setRepass] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("Nam");


  // kiểm tra
  const [checkEmail, setCheckEmail] = useState(true);
  // const [checkPass, setCheckPass] = useState(true);
  // const [checkPhone, setCheckPhone] = useState(true);
  // const [checkPasswordLength, setCheckPasswordLength] = useState(true);
  const [checkPass, setCheckPass] = useState(null);
  const [checkPhone, setCheckPhone] = useState(null);
  const [checkPasswordLength, setCheckPasswordLength] = useState(null);

  // Xử lý sự kiện khi người dùng thay đổi giá trị trường mật khẩu nhập lại
  const handleRepass = (event) => {
    setRepass(event.target.value);
  };

  // Theo dõi sự thay đổi của mật khẩu và mật khẩu nhập lại để kiểm tra sự trùng khớp
  useEffect(() => {
    setCheckPass(password === repass);
  }, [repass, password]);

  // Theo dõi sự thay đổi của số điện thoại để kiểm tra định dạng và độ dài
  // useEffect(() => {
  //   setCheckPhone(phone.length === 10 && phone.startsWith("0"));
  // }, [phone]);
  useEffect(() => {
    if (phone.length > 0) {
      setCheckPhone(phone.length === 10 && phone.startsWith("0"));
    } else {
      setCheckPhone(null);
    }
  }, [phone]);

  // Xử lý sự kiện khi người dùng thay đổi giá trị của trường giới tính
  const radioChange = (event) => {
    setSex(event.target.value);
  };

  // Hàm kiểm tra email hợp lệ bằng regex
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Kiểm tra độ dài mật khẩu
  // useEffect(() => {
  //   setCheckPasswordLength(password.length >= 6);
  // }, [password]);
  useEffect(() => {
    if (password.length > 0) {
      setCheckPasswordLength(password.length >= 6);
    } else {
      setCheckPasswordLength(null);
    }
  }, [password]);


  // Hàm đăng ký tài khoản
  const register = async (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit
    // Kiểm tra tính hợp lệ của email
    setCheckEmail(validateEmail(email));
    if (!validateEmail(email)) {
      return; // Dừng lại nếu email không hợp lệ hoặc mật khẩu không đủ dài
    }
    
    // Gửi yêu cầu đăng ký tài khoản lên server
    await axios({
      method: "post",
      maxBodyLength: Infinity,
      url: "/v1/account",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        username: phone,
        password: password,
        fullName: fullName,
        phoneNumber: phone,
        sex: sex,
        email: email,
        age: age,
      }),
    }).then(function (response) {
      console.log(response);
      if (response.status === 201) {
        if (response.data.data.role === "user") {
          var user = response.data.data.patient;
          sessionStorage.setItem("user", JSON.stringify(user));
          document.location.href = "/";
        }
      } else if (response.status === 204) {
        toast.error("Số điện thoại này hiện tại đã được sử dụng!");
      }
    });
  };

  return (
    <div>
      <Header />
      <section>
        <div className="bg-light py-3 py-md-5">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
                <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-5">
                        <h2 className="h3">Đăng ký tài khoản</h2>
                        <h3 className="fs-6 fw-normal text-secondary m-0">
                          Điền thông tin để đăng ký
                        </h3>
                      </div>
                    </div>
                  </div>
                  <form action="#!">
                    <div className="text-just row gy-3 gy-md-4 overflow-hidden">
                      <div className="col-12">
                        <label htmlFor="firstName" className="form-label">
                          Họ và tên <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="fullName"
                          id="fullName"
                          placeholder="Họ và tên"
                          required
                          value={fullName}
                          onChange={(event) => setFullName(event.target.value)}
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="lastName" className="form-label">
                          Số điện thoại<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                          id="phone"
                          placeholder="Ví dụ: 0399..."
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                          required
                        />
                        {/* {!checkPhone && (
                          <p className="text-danger">
                            Số điện thoại phải đúng định dạng và 10 chữ số
                          </p>
                        )} */}
                        {!checkPhone && phone.length > 0 && (
                          <p className="text-danger">
                            Số điện thoại phải đúng định dạng và 10 chữ số
                          </p>
                        )}
                      </div>
                      <div className="col-12">
                        <label htmlFor="email" className="form-label">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          required
                        />
                        {!checkEmail && (
                          <p className="text-danger">Email không hợp lệ</p>
                        )}
                      </div>

                      <div className="col-12">
                        <label htmlFor="age" className="form-label">
                          Tuổi: <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="age"
                          id="age"
                          value={age}
                          onChange={(event) => {
                            let enteredValue = parseInt(event.target.value, 10);
                            // Kiểm tra giá trị nhập vào để đảm bảo nó nằm trong khoảng từ 0 đến 200
                            if (enteredValue < 0) {
                              enteredValue = 0;
                            } else if (enteredValue > 200) {
                              enteredValue = 200;
                            } 
                            setAge(enteredValue);
                          }}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="email" className="form-label">
                          Giới tính<span className="text-danger">*</span>
                        </label>
                        <div className="sex-check">
                          <div className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              id="radio1"
                              name="optradio"
                              value="Nam"
                              onChange={radioChange}
                              checked={sex === "Nam"}
                            />
                            <label className="form-check-label" htmlFor="radio1">
                              Nam
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              id="radio2"
                              name="optradio"
                              value="Nữ"
                              onChange={radioChange}
                              checked={sex === "Nữ"}
                            />
                            <label className="form-check-label" htmlFor="radio2">
                              Nữ
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              id="radio3"
                              name="optradio"
                              value="Khác"
                              onChange={radioChange}
                              checked={sex === "Khác"}
                            />
                            <label className="form-check-label" htmlFor="radio3">
                              Khác
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 div_block-pass">
                        <label htmlFor="password" className="form-label">
                          Mật khẩu <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          id="password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          required
                        />
                        {/* {!checkPasswordLength && (
                          <p className="text-danger">
                            Mật khẩu phải có ít nhất 6 ký tự
                          </p>
                        )} */}
                        {!checkPasswordLength && password.length > 0 && (
                          <p className="text-danger">
                            Mật khẩu phải có ít nhất 6 ký tự
                          </p>
                        )}
                      </div>

                      <div className="col-12">
                        <label htmlFor="re-password" className="form-label">
                          Điền lại mật khẩu <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          name="re-password"
                          id="re-password"
                          value={repass}
                          onChange={handleRepass}
                          required
                        />
                        {!checkPass && (
                          <p className="text-danger">Mật khẩu không trùng khớp</p>
                        )}
                      </div>
                      <div className="col-12">
                        <div className="d-grid">
                          <button
                            className={`btn btn-lg btn-primary ${checkPass && checkPhone ? "" : "disabled"}`}
                            // className={`btn btn-lg btn-primary ${fieldsFilled ? "" : "disabled"}`}
                            type="submit"
                            onClick={register}
                          >
                            Đăng ký
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row mb-3 mt-3">
                    <div className="col-12">
                      <div className="col-12">
                        <p className="m-0 text-secondary text-center">
                          Đã có tài khoản?{" "}
                          <Link to="/login" className="link-primary text-decoration-none">
                            Đăng nhập
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer position="bottom-right" />
        </div>
      </section>
      <Footer />
    </div>
  );
}

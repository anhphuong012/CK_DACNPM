import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/profile.css";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Profile() {
  // const [male, setMale] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");

  const [selectShow, setSelectShow] = useState(null);
  const [show, setShow] = useState(false);

  const [password, setPassword] = useState("");
  const [newpass, setNewpass] = useState("");
  const [repasss, setRepass] = useState("");

  const [error, setError] = useState(true);
  const [messaegePass, setMessagePass] = useState("");
  const [messNewpass, setMessNewpass] = useState("");
  const [messRepass, setMessRepass] = useState("");

  const handleClose = () => {
    setShow(false);
    setPassword("");
    setNewpass("");
    setRepass("");
    setError(true);
  };
  const handleShow = () => {
    setShow(true);
  };

  const fetchData = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));

      const response = await axios.get(`/v1/patients/patient/${user.id}`);

      if (response.status == 200) {
        if (response.data.data != null) {
          setData(response.data.data);
          setName(response.data.data.fullName);
          setSex(response.data.data.sex);
          setEmail(response.data.data.email);
          setPhone(response.data.data.phoneNumber);
          setAge(response.data.data.age);
          console.log("change data");
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  useEffect(() => {
    if (password != "") {
      axios({
        method: "post",
        maxBodyLength: Infinity,
        url: "/v1/account/checkAccount",
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
          if (response.data.data) {
            setMessagePass("");
            if (
              repasss != "" &&
              newpass != "" &&
              newpass.length > 6 &&
              repasss == newpass
            ) {
              setError(false);
            }
          } else {
            setError(true);
            setMessagePass("Sai mật Khẩu");
          }
        }
      });
    } else {
      setMessagePass("");
    }
  }, [password]);

  useEffect(() => {
    if (newpass != "") {
      if (newpass.length < 6 || newpass == password) {
        setMessNewpass(
          "Mật khẩu phải từ 6 kí tự trở lên và không được trùng với mật khẩu cũ"
        );
        setError(true);
      } else {
        setMessNewpass("");
      }
    } else {
      setMessNewpass("");
    }
  }, [newpass]);

  useEffect(() => {
    if (repasss != "") {
      if (repasss != newpass) {
        setMessRepass("Mật khẩu nhập lại không trùng khớp");
        setError(true);
      } else {
        setMessRepass("");
      }
    } else {
      setMessRepass("");
    }
  }, [repasss]);

  useEffect(() => {
    if (repasss == newpass) {
      setMessRepass("");
      setError(false);
    } else {
      if (repasss != "") {
        setMessRepass("Mật khẩu nhâp lại không trùng khớp");
        setError(true);
      }
    }
  }, [repasss, newpass]);
  const update = () => {
    async function updatePost() {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token").toString()}`,
        },

        body: JSON.stringify({
          fullName: name,
          sex: sex,
          phoneNumber: phone,
          email: email,
          age: age,
        }),
      };

      try {
        const user = JSON.parse(sessionStorage.getItem("user"));

        const response = await fetch(
          `/v1/patients/patient/${user.id}`,
          requestOptions
        );
        const data = await response.json();
        console.log(data);
        setData(data.data);

        sessionStorage.setItem("user", JSON.stringify(data.data));
        toast.success("Thay đổi thành công!");
      } catch (error) {}
    }
    updatePost();
  };

  const refesh = () => {
    setName(data.fullName);
    setSex(data.sex);
    setEmail(data.email);
    setPhone(data.phoneNumber);
    setAge(data.age);
  };

  const handleChangePass = () => {
    if (newpass != "" && newpass.length >= 6) {
      axios({
        method: "post",
        maxBodyLength: Infinity,
        url: "/v1/account/changePass",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          username: phone,
          password: newpass,
        }),
      }).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          if (response.data.data) {
            handleClose();
            toast.success("Đổi mật khẩu thành công!");
          } else {
            toast.error("Đã xảy ra lỗi");
          }
        }
      });
    } else {
      toast.error("Đã xảy ra lỗi vui lòng thử lại!");
    }
  };

  console.log(phone);
  return (
    <div>
      <Header></Header>
      <section className="bg-gray pd-t-20">
        <div className="container bg-slate-100 pd-20 pd-b-40">
          <h1 className="text-lg font-semibold mb-3">Thông tin</h1>

          {data != null && (
            <div class="container">
              <div class="main-body">
                <div class="row gutters-sm">
                  <div class="col-md-4 mb-3">
                    <div class="card">
                      <div class="card-body">
                        <div class="d-flex flex-column align-items-center text-center">
                          <img
                            /**Nếu là phụ nữ sẽ đổi là https://bootdey.com/img/Content/avatar/avatar7.png */
                            src="https://bootdey.com/img/Content/avatar/avatar7.png"
                            alt="Admin"
                            class="rounded-circle"
                            width="150"
                          />
                          <div class="mt-3">
                            <h4>{data.fullName}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="card mb-3">
                      <div class="card-body" style={{ textAlign: "justify" }}>
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0  mt-8">Họ và tên</h6>
                          </div>
                          <input
                            class="col-sm-9 text-secondary pd-tb-8 none-border"
                            name="fullName"
                            type="text"
                            value={name}
                            onChange={(event) => {
                              setName(event.target.value);
                            }}
                            readOnly={!isEdit}
                          />
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0  mt-8">Giới tính</h6>
                          </div>
                          <input
                            class="col-sm-9 text-secondary pd-tb-8 none-border"
                            name="Sex"
                            type="text"
                            value={sex}
                            onChange={(event) => {
                              setSex(event.target.value);
                            }}
                            readOnly={!isEdit}
                          />
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0 mt-8">Email</h6>
                          </div>
                          <input
                            class="col-sm-9 text-secondary pd-tb-8 none-border"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(event) => {
                              setEmail(event.target.value);
                            }}
                            readOnly={!isEdit}
                          />
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0 mt-8">Số điện thoại</h6>
                          </div>
                          <input
                            class="col-sm-9 text-secondary pd-tb-8 none-border"
                            name="phone"
                            value={phone}
                            onChange={(event) => {
                              setPhone(event.target.value);
                            }}
                            readOnly={!isEdit}
                          />
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0 mt-8">Tuổi:</h6>
                          </div>
                          <input
                            class="col-sm-9 text-secondary pd-tb-8 none-border"
                            name="age"
                            value={age}
                            onChange={(event) => {
                              setAge(event.target.value);
                            }}
                            readOnly={!isEdit}
                          />
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-12">
                            {!isEdit && (
                              <div>
                                <button
                                  class="btn btn-info "
                                  target="__blank"
                                  /**Nếu click vào nút edit sẽ trả về  */
                                  onClick={() => setIsEdit(true)}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={handleShow}
                                  className={"ml-3 btn btn-success"}
                                >
                                  Đổi mật khẩu
                                </button>
                              </div>
                            )}
                            {isEdit && (
                              <div>
                                <button
                                  class="btn btn-outline-success "
                                  style={{ marginRight: "20px" }}
                                  onClick={() => {
                                    setIsEdit(false);
                                    update();
                                  }}
                                >
                                  Chấp nhận
                                </button>
                                <button
                                  class="btn btn-outline-danger "
                                  onClick={() => {
                                    setIsEdit(false);
                                    refesh();
                                  }}
                                >
                                  Hủy bỏ
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ToastContainer position="bottom-right" />
              </div>
            </div>
          )}
        </div>

        {
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Đổi mật khẩu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="mb-3 text-just">
                <label for="pwd" class="form-label">
                  Nhập Mật Khẩu Cũ:
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
                <span className="text-danger">{messaegePass}</span>
              </div>

              <div class="mb-3 text-just">
                <label for="pwd" class="form-label">
                  Nhập Mật Khẩu Mới:
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="pwd"
                  placeholder="Nhập mật khẩu mới"
                  name="pswd"
                  value={newpass}
                  onChange={(e) => {
                    setNewpass(e.target.value);
                  }}
                />
                <span className="text-danger">{messNewpass}</span>
              </div>

              <div class="mb-3 text-just">
                <label for="pwd" class="form-label">
                  Nhập Lại Mật Khẩu Mới:
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="pwd"
                  placeholder="Nhập mật khẩu"
                  name="pswd"
                  value={repasss}
                  onChange={(e) => {
                    setRepass(e.target.value);
                  }}
                />

                <span className="text-danger">{messRepass}</span>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="success"
                className={`${error ? "disabled" : ""}`}
                onClick={handleChangePass}
              >
                Đổi Mật Khẩu
              </Button>

              <Button variant="secondary" onClick={handleClose}>
                Trở Lại
              </Button>
            </Modal.Footer>
          </Modal>
        }
      </section>
      <Footer></Footer>
    </div>
  );
}

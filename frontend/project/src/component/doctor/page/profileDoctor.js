import React, { useState } from "react";
import Header from "../../user/page/Header";
import Footer from "../../user/page/Footer";


import "bootstrap/dist/css/bootstrap.min.css";
import "../../user/css/profile.css";

export default function Profile() {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div>
      <Header/>
      <section className="bg-gray pd-t-20">
        <div className="container bg-slate-100 pd-20 pd-b-40">
          <h1 className="text-lg font-semibold mb-3">Thông tin</h1>

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
                          <h4>John Doe</h4>
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
                          value={"Nguyễn Ngọc Phương"}
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
                          value={"abb@gmail.com"}
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
                          value={"(239) 816-9029"}
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
                          value={18}
                          readOnly={!isEdit}
                        />
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <h6 class="mb-0 mt-8">Làm việc tại:</h6>
                        </div>
                        <input
                          class="col-sm-9 text-secondary pd-tb-8 none-border"
                          name="placeJob"
                          type="text"
                          value={"Bệnh viện trung ương quân đội 108"}
                          readOnly={!isEdit}
                        />
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          {!isEdit && (
                            <button
                              class="btn btn-info "
                              target="__blank"
                              /**Nếu click vào nút edit sẽ trả về  */
                              onClick={() => setIsEdit(true)}
                            >
                              Edit
                            </button>
                          )}
                          {isEdit && (
                            <div>
                              <button
                                class="btn btn-outline-success "
                                style={{ marginRight: "20px" }}
                              >
                                Chấp nhận
                              </button>
                              <button
                                class="btn btn-outline-danger "
                                onClick={() => setIsEdit(false)}
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
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

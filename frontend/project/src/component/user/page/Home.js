/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-sparse-arrays */
import React, { useState, Component, useEffect } from "react";
import "../css/home.css";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./Footer";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

import { useNavigate } from "react-router-dom";
export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);

  const [search, setSearch] = useState(null);

  const [isLoad, setIsLoad] = useState(true);

  const navigate = useNavigate();
  //Xử lí lấy giá trị trong ô input tìm kiếm
  const handleChangeInputvalue = (event) => {
    const searchWord = event.target.value;
    setInputValue(searchWord);
  };

  const fetchData = async () => {
    const response = await axios.get(`/v1/doctor/limit?size=4`);

    if (response.status == 200) {
      if (response.data.data != null) {
        setData(response.data.data);
        setIsLoad(false);
        console.log(data);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const auto = async (value) => {
    const response = await axios.get(`/v1/sick?name=${value}`);

    if (response.status == 200) {
      if (response.data.data != null) {
        setSearch(response.data.data);
      }
    }
  };
  useEffect(() => {
    console.log("Compare:" + (inputValue == ""));
    if (inputValue == "") {
      setSearch(null);
    } else {
      auto(inputValue);
    }
  }, [inputValue]);

  const clickauto = (name) => {
    setInputValue(name);
    setSearch(null);
  };

  //Component thông tin bác sĩ ở trang Home
  const Card = (props) => {
    return (
      <div>
        <div class="card instruc-card" style={{ width: "300px" }}>
          <img
            class="card-img-top rounded-circle avata"
            src={props.props.avatar}
            alt="Card image"
          />
          <div class="card-body">
            <h4 class="card-title author-card">{props.props.name}</h4>
            <p class="text-sm text-des-card mr-b-2">{props.props.department}</p>
            <p class="text-sm  text-des-card">{props.props.placeOfwork}</p>
            <button
              class="btn btn-primary"
              onClick={() => {
                navigate(`/booking/${props.props.id}`);
              }}
            >
              Đặt lịch
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header />

      <section className="bg-primary main-content  relative overflow-hidden">
        <div>
          <h1 className="title text-white">Ứng dụng đặt khám</h1>
          <div className="title-descreption">
            <p className="text-white ">
              Đặt khám với hơn 600 bác sĩ, 100 phòng khám trên YouMed để có số
              thứ tự và khung giờ khám trước.
            </p>
          </div>
        </div>

        <div div="wrap-search" style={{ minWidth: "70%" }}>
          <div class="input-group input-group-lg relative">
            <input
              placeholder="Nhập triệu chứng, tên bác sĩ..."
              type="text"
              class="form-control search"
              value={inputValue}
              onChange={handleChangeInputvalue}
              /**Xử lí sự kiện nếu bấm enter */
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  // window.location.href = `/search/${inputValue}`;
                  navigate(`/search/${inputValue}`);
                }
              }}
            />
            <button
              className="btn-search color-black "
              // href={`/search/${inputValue}`}
              onClick={() => {
                navigate(`/search/${inputValue}`);
              }}
            >
              <i class="bi bi-search"></i>
            </button>
          </div>

          {search != null && inputValue != "" && (
            <div className={"auto-complete"}>
              {search.map((item) => {
                return (
                  <div key={item.id}>
                    <button
                      className="btn-auto_complete "
                      onClick={() => {
                        // setInputValue(item.name);
                        // setSearch(null);
                        clickauto(item.name);
                      }}
                    >
                      {" "}
                      {item.name}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="container mt-5">
        <div>
          <h1 className="title text-xl">Đặt lịch khám trực tuyến</h1>
          <p className="instruct-des">
            Tìm bác sĩ chính xác - Đặt lịch khám dễ dàng
          </p>
        </div>

        <div className="instruct d-flex justify-content-between">
          <div className="instruct-left">
            <h2 className="instruct-title">Đặt khám bác sĩ</h2>
            <p className="text-sm ">
              Phiếu khám kèm theo số thứ tự và thời gian bạn được xác nhận
            </p>
          </div>
          {/* <div>
            <button className="btn btn-primary btn-radius">
              Xem tất cả
              <i class="bi bi-arrow-right"></i>
            </button>
          </div> */}
        </div>
        {isLoad && (
          <Box sx={{ marginTop: "7rem", width: "100%", margin: "auto" }}>
            <CircularProgress />
          </Box>
        )}

        {!isLoad && (
          <div className="list-doctor">
            {data != null && data.map((item) => <Card props={item}></Card>)}
          </div>
        )}
      </section>
      <Footer></Footer>
    </div>
  );
}

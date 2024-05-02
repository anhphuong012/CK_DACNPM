/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-sparse-arrays */
import React, { useState, Component } from "react";
import "../css/home.css";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./Footer";

export default function Home() {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Lê Thị Minh Hồng",
      agree: "",
      department: "Nhi Khoa",
      hospital: "Bệnh viện Nhi Đồng 2",
      img: "https://cdn.youmed.vn/photos/6482af81-ab7d-4587-b011-8a9bad38a1e9.png?width=100&aspect_ratio=1:1",
    },
    {
      id: 2,
      name: "Lâm Việt Trung",
      agree: "PGS",
      department: "Tiêu Hóa",
      hospital: "Bệnh viện chợ Rẫy",
      img: "https://cdn.youmed.vn/photos/4f01e016-00cf-498c-a82e-761393de038c.jpeg?width=100&aspect_ratio=1:1",
    },
    {
      id: 3,
      name: "Nguyễn Thị Thu Hà",
      agree: "",
      department: "Nhi Khoa",
      hospital: "Bệnh viện Nhi Đồng Thành Phố",
      img: "https://cdn.youmed.vn/photos/d9bdabb7-7afb-419a-8533-db34a775e504.jpg?width=100&aspect_ratio=1:1",
    },
    {
      id: 4,
      name: "Võ Đực Hiếu",
      agree: "",
      department: "Ung bướu",
      hospital: "Bệnh viện Ung Bứu",
      img: "https://cdn.youmed.vn/photos/09f68f6c-131b-45ed-97d6-afdc89fa51e3.jpg?width=100&aspect_ratio=1:1",
    },
    ,
    {
      id: 5,
      name: "Trần Quang Nam",
      agree: "TS",
      department: "Nội Tiết",
      hospital: "Bệnh viện Trường ĐH Y Dược",
      img: "https://cdn.youmed.vn/photos/68c2307d-18f8-4e97-9ef3-99fea20a286d.png?width=100&aspect_ratio=1:1",
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  //Xử lí lấy giá trị trong ô input tìm kiếm
  const handleChangeInputvalue = (event) => {
    const searchWord = event.target.value;
    setInputValue(searchWord);
  };

  //Component thông tin bác sĩ ở trang Home
  const Card = (props) => {
    return (
      <div>
        <div class="card instruc-card" style={{ width: "300px" }}>
          <img
            class="card-img-top rounded-circle avata"
            src={props.props.img}
            alt="Card image"
          />
          <div class="card-body">
            <h4 class="card-title author-card">{props.props.name}</h4>
            <p class="text-sm text-des-card mr-b-2">{props.props.department}</p>
            <p class="text-sm  text-des-card">{props.props.hospital}</p>
            <a href={`/booking/${props.props.id}`} class="btn btn-primary">
              Đặt lịch
            </a>
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
          <div class="input-group mb-3 input-group-lg">
            <input
              placeholder="Nhập triệu chứng, .."
              type="text"
              class="form-control search"
              value={inputValue}
              onChange={handleChangeInputvalue}
              /**Xử lí sự kiện nếu bấm enter */
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  window.location.href = `/search/${inputValue}`;
                }
              }}
            />
            <a
              className="btn-search color-black "
              href={`/search/${inputValue}`}
            >
              <i class="bi bi-search"></i>
            </a>
          </div>
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

        <div className="list-doctor">
          {doctors.map((item) => (
            <Card props={item}></Card>
          ))}
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}

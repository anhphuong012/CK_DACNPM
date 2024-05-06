import React, { useState, useEffect } from "react";
import Header from "./Header";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import "../css/search.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ListSearch() {
  //Lấy giá trị search truyền qua
  const params = useParams();
  const keyword = params.keyword;

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(keyword);
  }, []);

  const fetchData = (keyword) => {
    const fetchPromise = fetch(`/v1/doctor/search?sick=${keyword}`);

    fetchPromise
      .then((response) => response.json())
      .then((data) => {
        if (data.data != null) {
          setData(data.data);
        }
      });
  };

  const handleSubmit = () => {
    var key = document.getElementById("input-search").value;

    window.location.href = `/search/${key}`;
  };

  console.log(keyword);

  console.log(data);

  const handleBooking = (id) => {
    document.location.href = `/booking/${id}`;
  };

  //Component thông tin về bác sĩ
  const Doctor = (props) => {
    console.log("Props:" + props.props.fullName);
    return (
      <div>
        <ListItem
          alignItems="flex-start"
          sx={{ paddingBottom: 2.3, paddingTop: 2.3 }}
        >
          <ListItemAvatar sx={{ width: 100, height: 83, marginTop: 0 }}>
            <Avatar
              alt="Remy Sharp"
              src={props.props.avatar}
              sx={{ width: 80, height: 80 }}
            />
          </ListItemAvatar>
          <div className="infor-doctor">
            <span className=" ">
              {" "}
              {props.props.degree} BS. {props.props.fullName}
            </span>

            <div className="infor-center">
              <span className="text-sm py-1 px-3 bg-gray-100  border-radius">
                {props.props.department}
              </span>
            </div>

            <span className="text-sm ">{props.props.placeOfwork}</span>
          </div>

          <div className="warp-btn-booking ">
            <button
              className="btn btn-primary"
              onClick={() => {
                handleBooking(props.props.id);
              }}
            >
              Đặt khám
            </button>
          </div>
        </ListItem>
        <Divider variant="fullWidth" component="li" />
      </div>
    );
  };
  return (
    <div>
      <Header></Header>
      <section className="bg-white mt-4 boder-b">
        <div className="header-container mr-l-r-auto">
          <div
            className="wrap-search mr-l-r-auto just-center"
            style={{ paddingTop: "20px" }}
          >
            <div class="input-group mb-3 input-group-lg w-50 ">
              <input
                placeholder="Nhập triệu chứng,tên bác sĩ..."
                type="text"
                class="form-control search bg-gray-100"
                id="input-search"
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    window.location.href = `/search/${event.target.value}`;
                  }
                }}
              />
              <button className="btn-search " onClick={handleSubmit}>
                <i class="bi bi-search color-primary"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 pd-30 ">
        <div className="container w-90">
          <div className="bg-white result-search">
            {data.length > 0 && (
              <span>
                Có {data.length} Bác sĩ được tìm thấy cho triệu chứng hoặc tên "
                {keyword}"
              </span>
            )}
            {data.length == 0 && (
              <span>
                Không tìm thấy Bác sĩ cho triệu chứng hoặc tên "{keyword}"
              </span>
            )}
          </div>
          <Divider></Divider>
          <List
            sx={{
              width: "100%",
              maxWidth: "100%",
              bgcolor: "background.paper",
              paddingBottom: "10px",
            }}
            style={{ borderRadius: "0px 0px 10px 10px" }}
          >
            {data.length > 0 &&
              data.map((doctor) => {
                return (
                  <div key={doctor.id}>
                    <Doctor props={doctor}></Doctor>
                  </div>
                );
              })}
          </List>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}

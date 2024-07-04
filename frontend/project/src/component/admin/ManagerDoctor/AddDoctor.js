import HeaderAdmin from "../HeaderAdmin/HeaderAdmin";
import "./addDoctor.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import { useRef, useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { set } from "date-fns";

export default function AddDoctor() {
  const inputRef = useRef(null);

  const handleClick = () => {
    // 👇️ Open the file input box on click of another element
    inputRef.current.click();
  };
  //   const handleFileChange = (event) => {
  //     const fileObj = event.target.files && event.target.files[0];
  //     if (!fileObj) {
  //       return;
  //     }

  //     console.log("fileObj is", fileObj);

  //     // 👇️ Reset file input
  //     event.target.value = null;

  //     // 👇️ Is now empty
  //     console.log(event.target.files);

  //     // 👇️ Can still access the file object here
  //     console.log(fileObj);
  //     console.log(fileObj.name);
  //   };

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [degree, setDegree] = useState([
    { id: 1, name: "BS" },
    { id: 2, name: "GS" },
    { id: 3, name: "PGS" },
    { id: 4, name: "TS" },
  ]);

  const [department, setDepartment] = useState(null);
  const [descreption, setDescreption] = useState("");
  const [selectDegree, setSelectDegree] = useState(1);
  const [selectDeparment, setSelectDeparment] = useState(1);

  const [place, setPlace] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [load, setLoad] = useState(true);

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);

      // Tạo URL để xem trước ảnh
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      console.log("chooose file");
    } else {
      setSelectedFile(null);
      setPreview(null);
    }
  };

  const handleSubmit = async () => {
    if (
      !selectedFile ||
      name == "" ||
      email == "" ||
      userName == "" ||
      password == "" ||
      place == ""
    ) {
      toast.error(
        "Họ tên, Email, Nơi làm việc,Tên Đăng Nhập và Mật khẩu  không được bỏ trống"
      );
    } else {
      const formData = axios.toFormData({
        file: selectedFile,
        doctor: `{
    "username":"${userName}",
    "password":"${password}",
    "fullName":"${name}",
    "avatar":"",
    "email":"${email}",
    "degree":"${degree[selectDegree - 1].name}",
    "descreption":"${descreption}",
    "department":"${selectDeparment}",
    "placeOfwork":"${place}"
}`,
      });
      for (const value of formData.values()) {
        console.log(value);
      }
      console.log(selectedFile);

      await axios({
        method: "post",
        maxBodyLength: Infinity,
        url: "/v1/account/doctor",

        headers: {
          "Content-Type": `multipart/form-data boundary=${formData._boundary}`,
          Authorization: `Bearer ${sessionStorage.getItem("token").toString()}`,
        },
        mode: "cors",
        data: formData,
      }).then(function (response) {
        if (response.status == 201) {
          if (response.data.data == null) {
            toast.error(
              "Tên đăng nhập đã có trong hệ thống vui lòng chọn tên khác"
            );
          } else {
            navigate("/admin/manage-doctor");
          }
        }
      });
    }
  };

  console.log(selectDegree);

  const fetchDepartment = async () => {
    try {
      const response = await axios.get("/v1/department");
      // ,
      //   {
      //   headers: {
      //     Authorization: `Bearer ${sessionStorage.getItem("token").toString()}`,
      //   },
      // }

      if (response.status === 200) {
        if (response.data.data != null) {
          setDepartment(response.data.data);
          setLoad(false);
        }
      }
    } catch (error) {
      console.log(error);
      //   navigate("/login");
    }
  };

  useEffect(() => {
    fetchDepartment();
  }, []);
  return (
    <div className="container-main mb-5">
      <HeaderAdmin></HeaderAdmin>

      <div className="main-content">
        <h3 className="title-manager">Thêm Bác Sĩ</h3>
        <div className="form-add">
          <Box
            sx={{
              width: "60%",
              maxWidth: "100%",
            }}
          >
            <div>
              <TextField
                fullWidth
                label="Họ và tên"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="bg-white"
              />
            </div>

            <div className="mt-3">
              <TextField
                fullWidth
                label="Email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="bg-white"
              />
            </div>
          </Box>
          <div className="mt-3">
            <div
              style={{
                marginLeft: "-50%",
                color: "#000",
                marginBottom: "15px",
                fontWeight: "600",
              }}
            >
              <span>Hình sản phẩm</span>
            </div>
            <div className={"d-flex"} style={{ margin: "0px 10%" }}>
              {/* <input
                  style={{ display: "none" }}
                  ref={inputRef}
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />

                <button onClick={handleClick}>Open file upload box</button> */}
              {/* <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  ref={inputRef}
                />
                <button onClick={handleClick}>Chọn hình ảnh</button> */}

              <div
                style={{
                  flex: 1,
                  width: "150px",
                  height: "180px",
                }}
              >
                <img
                  src={preview}
                  alt="Preview"
                  style={{ width: "50%", height: "100%" }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              {/* {preview && (
                  <div>
                    <img
                      src={preview}
                      alt="Preview"
                      style={{ maxWidth: "200px", marginTop: "10px" }}
                    />
                  </div>
                )} */}
            </div>
          </div>
          <Box
            sx={{
              width: "60%",
              maxWidth: "100%",
            }}
          >
            <div className="mt-3">
              {degree != null && (
                <TextField
                  id="degree"
                  select
                  label="Học vị"
                  defaultValue={degree[0].id}
                  fullWidth
                  onChange={(e) => {
                    setSelectDegree(e.target.value);
                  }}
                  className="bg-white"
                >
                  {degree != null &&
                    degree.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                </TextField>
              )}
            </div>

            <div className="mt-3">
              {department != null && (
                <TextField
                  id="department"
                  select
                  label="Khoa"
                  defaultValue={department[0].id}
                  fullWidth
                  onChange={(e) => {
                    setSelectDeparment(e.target.value);
                  }}
                  className="bg-white"
                >
                  {!load &&
                    department.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                </TextField>
              )}
            </div>
          </Box>

          <Box
            sx={{
              width: "60%",
              maxWidth: "100%",
            }}
          >
            <div className="mt-3 mb-4">
              <TextField
                fullWidth
                label="Mô tả"
                id="descreption"
                multiline
                rows={4}
                value={descreption}
                onChange={(e) => {
                  setDescreption(e.target.value);
                }}
                className="bg-white"
              />
            </div>
          </Box>
          <Box
            sx={{
              width: "60%",
              maxWidth: "100%",
            }}
          >
            <div>
              <TextField
                fullWidth
                label="Nơi làm việc"
                id="place"
                value={place}
                onChange={(e) => {
                  setPlace(e.target.value);
                }}
                className="bg-white"
              />
            </div>
            <div className="mt-3">
              <TextField
                fullWidth
                label="Tên đăng nhập"
                id="userName"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                className="bg-white"
              />
            </div>

            <div className="mt-3">
              <TextField
                fullWidth
                label="Mật khẩu"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="bg-white"
              />
            </div>
          </Box>

          <div className="mt-4 mb-5">
            <button className="btn btn-success mr-4" onClick={handleSubmit}>
              Thêm
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/admin/manage-doctor");
              }}
            >
              Trở về
            </button>
          </div>
        </div>
        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
}

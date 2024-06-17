import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/footer.css";

export default function Footer() {
  return (
    <div className="bg-gray-100">
      <div className="container d-flex pd-t-20">
        <div className="col-6 aligan-just pd-r-12">
          <p className="bold mr-b-2">CÔNG TY TNHH YOUMED VIỆT NAM</p>
          <strong>VPĐP:</strong>{" "}
          <span>523 Tô Hiến Thành, P.14, Q.10, TP. HCM</span>
          <br />
          <strong>Hotline:</strong>{" "}
          <span>1900-2805 (8:30 - 20:30 từ T2 đến T7)</span>
          <p>
            Số ĐKKD 0315268642 do Sở Kế hoạch và Đầu tư TP. Hồ Chí Minh cấp lần
            đầu ngày 14/09/2018.
          </p>
        </div>
        <div className="col-6 pr-20 aligan-just">
          <p className="bold mr-b-2">Kết nối với chúng tôi</p>
          <div>
            <a href="" className="mr-l-r">
              <i class="bi bi-facebook"></i>
            </a>
            <a href="" className="mr-l-r">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="" className="mr-l-r">
              <i class="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

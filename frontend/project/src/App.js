/* eslint-disable react/react-in-jsx-scope */
import "./App.css";
import Home from "./component/user/page/Home";
import LoginPage from "./component/user/page/Login";
import Register from "./component/user/page/Register";
import ListSearch from "./component/user/page/ListSearch";
import Booking from "./component/user/page/Booking";
import Schedule from "./component/user/page/Schedule";
import ScheduleCancel from "./component/user/page/ScheduleCancel";
import Profile from "./component/user/page/Profile";
import HomeDoctor from "./component/doctor/page/HomeDoctor";
import ProfileDoctor from "./component/doctor/page/profileDoctor";
import CreateCalendar from "./component/doctor/page/createCalendar";
import WatchCalendar from "./component/doctor/page/watchCalendar";

import ManagerUser from "./component/admin/ManagerUser/ManagerUser";
import ManagerDoctor from "./component/admin/ManagerDoctor/ManagerDoctor";
import AddDoctor from "./component/admin/ManagerDoctor/AddDoctor";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/search/:keyword" element={<ListSearch />} />
        <Route path="/search/" element={<ListSearch />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/schedulecancel" element={<ScheduleCancel />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<HomeDoctor />}></Route>
        <Route path="/profile-doctors" element={<ProfileDoctor />} />
        <Route path="/create-calendar" element={<CreateCalendar />} />
        <Route path="/watch-calendar" element={<WatchCalendar />} />
        <Route path="/admin/manage-user" element={<ManagerUser />} />
        <Route path="/admin/manage-doctor" element={<ManagerDoctor />} />
        <Route path="/admin/manage-doctor/add" element={<AddDoctor />} />
      </Routes>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/date.css";

export default function DatePickerComponent({ onSelect }) {
    const [startDate, setStartDate] = useState(null);

    const handleDateSelect = (date) => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Đặt giờ của ngày hiện tại về 00:00:00
        
        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0); // Đặt giờ của ngày được chọn về 00:00:00
        
        if (selectedDate > currentDate) {
          setStartDate(date);
          onSelect(date);
        } else {
          alert("Bạn chỉ có thể chọn các ngày sau ngày hiện tại.");
        }
    };
    

    return (
        <div>
            <DatePicker
                selected={startDate}
                onChange={(date) => handleDateSelect(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                className="datePicker"
                placeholderText="Ngày/Tháng/Năm"
                showIcon
                toggleCalendarOnIconClick

            />
        </div>
    );
}


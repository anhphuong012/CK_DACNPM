import React, { useState, useEffect } from 'react';
import '../css/dateTime.css';

export const DateTime = () => {
    const [date, setDate] = useState(new Date());
    
    // Khởi tạo ngày và giờ
    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formatDate = (date) => {
        const options = { weekday: 'long', timeZone: 'Asia/Ho_Chi_Minh' };
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const weekday = date.toLocaleDateString('vi-VN', options);
        // Định dạng giờ VN
        return `${weekday}, ${day}/${month}/${year}`;
    };

    return (
        <div className='date'>
            <p className='date_format-text'>
                {formatDate(date)}
            </p>
            <p className='date_time-text'>
                {date.toLocaleString("vi-VN", {
                    hour: "numeric",
                    minute: "numeric",
                    second: "2-digit",
                    hour12: false,
                })}
            </p>
        </div>
    )
  
}

export default DateTime;


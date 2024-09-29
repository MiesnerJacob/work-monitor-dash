import React, { useState, useEffect } from 'react';

function Clock() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDay = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  const formatDate = (date: Date) => {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div className="card w-96 bg-base-200 shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-3xl font-bold">{formatDay(currentDateTime)}</h2>
        <p className="text-xl">{formatDate(currentDateTime)}</p>
        <p className="text-4xl font-semibold">{formatTime(currentDateTime)}</p>
      </div>
    </div>
  );
}

export default Clock;
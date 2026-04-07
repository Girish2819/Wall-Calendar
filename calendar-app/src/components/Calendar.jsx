import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
} from "date-fns";

import DayCell from "./DayCell";
import Notes from "./Notes";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleClick = (day) => {
  if (!startDate) {
    setStartDate(day);
  } else if (!endDate) {
    if (day < startDate) {
      setStartDate(day); // restart selection
    } else {
      setEndDate(day);
    }
  } else {
    setStartDate(day);
    setEndDate(null);
  }
};

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startGrid = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endGrid = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = [];
  let day = startGrid;
  while (day <= endGrid) {
    days.push(day);
    day = addDays(day, 1);
  }

  return (
    <div className="calendar-wrapper">

      {/* SPIRAL */}
      <div className="spiral"></div>

      {/* IMAGE */}
      <div className="image-container">
        <img src="/calendar.jpg" alt="calendar" />

        <div className="blue-shape left"></div>
        <div className="blue-shape right"></div>

        <div className="month-text">
          <span className="month-year">{format(currentDate, "yyyy")}</span>
          <span className="month-name">{format(currentDate, "MMMM")}</span>
        </div>
      </div>

      {/* BODY */}
      <div className="calendar-body">

        {/* NOTES */}
        <Notes />

        {/* GRID */}
        <div className="grid">

          {["MON","TUE","WED","THU","FRI","SAT","SUN"].map((d) => (
            <div className="header" key={d}>{d}</div>
          ))}

          {days.map((d, i) => (
           <DayCell
  key={i}
  day={d}
  currentDate={currentDate}
  startDate={startDate}
  endDate={endDate}
  onClick={handleClick}
/>
          ))}

        </div>
      </div>
      <div className="bottom-fade"></div>
    </div>
  );
}
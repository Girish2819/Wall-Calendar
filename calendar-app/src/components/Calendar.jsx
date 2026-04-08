import React, { useState, useEffect } from "react";
import { 
  format, addMonths, subMonths, 
  startOfMonth, startOfWeek, addDays 
} from "date-fns";
import DayCell from "./DayCell";
import Notes from "./Notes";

const HOLIDAYS = {
  "01-01": "New Year's Day",
  "02-14": "Valentine's Day",
  "03-17": "St. Patrick's Day",
  "04-22": "Earth Day",
  "07-04": "Independence Day",
  "10-31": "Halloween",
  "12-25": "Christmas",
  "12-31": "New Year's Eve",
};

const HERO_IMAGES = [
  "/1.jpg","/2.jpg","/3.jpg","/4.jpg","/5.jpg","/6.jpg",
  "/7.jpg","/8.jpg","/9.jpg","/10.jpg","/11.jpg","/12.jpg",
];

export default function Calendar() {
  const [viewDate, setViewDate] = useState(new Date());
  const [range, setRange] = useState({ start: null, end: null });
  const [monthlyNote, setMonthlyNote] = useState("");
  const [rangeNotes, setRangeNotes] = useState({});
  const [monthRanges, setMonthRanges] = useState({});
  const [isFlipping, setIsFlipping] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [notesLoaded, setNotesLoaded] = useState(false);
  const [monthNoteLoaded, setMonthNoteLoaded] = useState(false);

  const heroImage = HERO_IMAGES[viewDate.getMonth() % HERO_IMAGES.length];

  const getMonthKey = (date) => format(date, "yyyy-MM");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("monthlyNotes")) || {};
    const key = getMonthKey(viewDate);
    setMonthlyNote(saved[key] || "");
    setMonthNoteLoaded(true);
  }, [viewDate]);

  useEffect(() => {
    if (!monthNoteLoaded) return;
    const saved = JSON.parse(localStorage.getItem("monthlyNotes")) || {};
    const key = getMonthKey(viewDate);
    saved[key] = monthlyNote;
    localStorage.setItem("monthlyNotes", JSON.stringify(saved));
  }, [monthlyNote, viewDate, monthNoteLoaded]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("rangeNotes")) || {};
    setRangeNotes(saved);
    setNotesLoaded(true);
  }, []);

  useEffect(() => {
    if (!notesLoaded) return;
    localStorage.setItem("rangeNotes", JSON.stringify(rangeNotes));
  }, [rangeNotes, notesLoaded]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("monthRanges")) || {};
    setMonthRanges(saved);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("monthRanges", JSON.stringify(monthRanges));
  }, [monthRanges, isLoaded]);

  useEffect(() => {
    const key = format(viewDate, "yyyy-MM");
    if (monthRanges[key]) {
      setRange({
        start: monthRanges[key].start ? new Date(monthRanges[key].start) : null,
        end: monthRanges[key].end ? new Date(monthRanges[key].end) : null
      });
    } else {
      setRange({ start: null, end: null });
    }
  }, [viewDate, monthRanges]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight") handleNextMonth();
      if (e.key === "ArrowLeft") handlePrevMonth();
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handlePrevMonth = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setViewDate(subMonths(viewDate, 1));
      setIsFlipping(false);
    }, 300);
  };

  const handleNextMonth = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setViewDate(addMonths(viewDate, 1));
      setIsFlipping(false);
    }, 300);
  };

  const days = [];
  let day = startOfWeek(startOfMonth(viewDate), { weekStartsOn: 1 });
  for (let i = 0; i < 42; i++) {
    days.push(day);
    day = addDays(day, 1);
  }

  const handleDateClick = (d) => {
    let newRange;

    if (!range.start) {
      newRange = { start: d, end: null };
    } 
    else if (range.start && !range.end) {
      if (d < range.start || d.getTime() === range.start.getTime()) {
        newRange = { start: null, end: null };
      } else {
        newRange = { start: range.start, end: d };
      }
    } 
    else {
      newRange = { start: d, end: null };
    }

    setRange(newRange);

    const key = format(viewDate, "yyyy-MM");

    setMonthRanges({
      ...monthRanges,
      [key]: {
        start: newRange.start,
        end: newRange.end
      }
    });
  };

  const getRangeKey = () => {
    if (!range.start) return null;

    const monthKey = format(viewDate, "yyyy-MM");

    if (!range.end) {
      return `${monthKey}_${format(range.start, "yyyy-MM-dd")}`;
    }

    return `${monthKey}_${format(range.start, "yyyy-MM-dd")}_${format(range.end, "yyyy-MM-dd")}`;
  };

  const getRangeLabel = () => {
    if (!range.start) return null;
    if (!range.end) return format(range.start, "MMM d, yyyy");
    return `${format(range.start, "MMM d")} - ${format(range.end, "MMM d, yyyy")}`;
  };

  const currentRangeKey = getRangeKey();
  const currentRangeLabel = getRangeLabel();

  return (
    <div className="calendar-container">
      <div className="spiral-header">
        {[...Array(34)].map((_, i) => <div key={i} className="spiral-ring" />)}
      </div>

      <div className="hero-section">
        <div className="absolute top-6 left-6 flex gap-2 z-30">
          <button onClick={handlePrevMonth} className="nav-arrow">←</button>
          <button onClick={handleNextMonth} className="nav-arrow">→</button>
        </div>

        <img src={heroImage} className={`hero-img ${isFlipping ? 'flip-out' : 'flip-in'}`} alt="" />

        <div className="blue-accent-left" />
        <div className="blue-accent-right" />

        <div className="hero-date-label">
          <p className="year-label">{format(viewDate, "yyyy")}</p>
          <p className="month-label">{format(viewDate, "MMMM")}</p>
        </div>
      </div>

      <div className="calendar-body">
        <div className="notes-column">
          <Notes 
            monthlyNote={monthlyNote}
            onMonthlyNoteChange={setMonthlyNote}
            currentRangeLabel={currentRangeLabel}
            currentRangeNote={currentRangeKey ? (rangeNotes[currentRangeKey] || "") : ""}
            onRangeNoteChange={(note) => {
              if (currentRangeKey) {
                const updated = { ...rangeNotes, [currentRangeKey]: note };
                setRangeNotes(updated);
              }
            }}
          />
        </div>

        <div className="grid-column">
          {(range.start || range.end) && (
            <div className="selection-stats">
              <span>
                {range.end 
                  ? `${Math.abs((range.end - range.start) / (1000 * 60 * 60 * 24)) + 1} days selected`
                  : "Start date selected"}
              </span>
            </div>
          )}

          <div className="weekday-header">
            {["MON","TUE","WED","THU","FRI","SAT","SUN"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="days-grid">
            {days.map((d, i) => {
              const holiday = HOLIDAYS[format(d, "MM-dd")];
              return (
                <DayCell
                  key={i}
                  date={d}
                  activeMonth={viewDate}
                  range={range}
                  onClick={() => handleDateClick(d)}
                  holiday={holiday}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
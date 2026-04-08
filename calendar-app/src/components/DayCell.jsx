import { format, isSameMonth, isSameDay, isWithinInterval, getDay } from "date-fns";

export default function DayCell({ date, activeMonth, range, onClick, holiday }) {
  const isCurrentMonth = isSameMonth(date, activeMonth);
  const isStart = range.start && isSameDay(date, range.start);
  const isEnd = range.end && isSameDay(date, range.end);
  const inRange = range.start && range.end && isWithinInterval(date, { start: range.start, end: range.end });
  const isWeekend = getDay(date) === 0 || getDay(date) === 6;
  const isToday = isSameDay(date, new Date());

  let classes = "day-cell ";
  if (!isCurrentMonth) {
    classes += "text-gray-200 pointer-events-none ";
  } else if (isStart && isEnd) {
    classes += "range-single ";
  } else if (isStart) {
    classes += "range-start ";
  } else if (isEnd) {
    classes += "range-end ";
  } else if (inRange) {
    classes += "in-range-date ";
  } else if (isToday) {
    classes += "today-date ";
  } else if (holiday) {
    classes += "holiday-date ";
  } else if (isWeekend) {
    classes += "text-sky-500 ";
  } else {
    classes += "text-gray-800 ";
  }

  return (
    <div onClick={isCurrentMonth ? onClick : undefined} className={classes} title={holiday}>
      {format(date, "d")}
      {holiday && <span className="holiday-dot" />}
    </div>
  );
}
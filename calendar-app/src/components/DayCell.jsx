import {
  format,
  isSameDay,
  isWithinInterval,
  getDay,
  isSameMonth,
  isToday,
} from "date-fns";

export default function DayCell({
  day,
  currentDate,
  startDate,
  endDate,
  onClick,
}) {
  let cls = "day";

  // ✅ Check faded FIRST
  const isFaded = !isSameMonth(day, currentDate);
  if (isFaded) cls += " faded";

  // 🔵 Weekend
  const dayIndex = getDay(day);
  if (dayIndex === 0 || dayIndex === 6) {
    cls += " weekend";
  }

  // ⭐ Today
  if (isToday(day)) {
    cls += " today";
  }

  // ✅ Apply selection ONLY if not faded
  if (!isFaded) {
    if (startDate && isSameDay(day, startDate)) cls += " start";
    else if (endDate && isSameDay(day, endDate)) cls += " end";
    else if (
      startDate &&
      endDate &&
      isWithinInterval(day, { start: startDate, end: endDate })
    ) {
      cls += " range";
    }
  }

  return (
    <div
      className={cls}
      onClick={() => {
        if (!isFaded) onClick(day); // disable faded click
      }}
    >
      {format(day, "d")}
    </div>
  );
}
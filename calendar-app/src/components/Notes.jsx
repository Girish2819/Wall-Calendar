export default function Notes({ 
  monthlyNote = "", 
  onMonthlyNoteChange = () => {}, 
  currentRangeLabel = null,
  currentRangeNote = "",
  onRangeNoteChange = () => {}
}) {
  return (
    <div className="flex flex-col h-full">
      <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-800 mb-2 border-b border-gray-100 pb-2">
        Notes
      </h4>
      
      {/* <p className="text-[8px] text-gray-400 mb-3 italic">
        ⌨️ Use arrow keys to navigate months
      </p> */}

      <div className="mb-4">
        <label className="text-[9px] font-semibold uppercase tracking-wide text-gray-600 block mb-2">
          📅 Monthly Memo
        </label>
        <div className="lined-paper h-24">
          <textarea 
            className="notes-textarea"
            placeholder="General notes for this month..."
            value={monthlyNote}
            onChange={(e) => onMonthlyNoteChange(e.target.value)}
            spellCheck="false"
          />
        </div>
      </div>

      {/* Range-Specific Notes */}
      <div className="border-t border-gray-100 pt-4">
        <label className="text-[9px] font-semibold uppercase tracking-wide text-blue-600 block mb-2">
          📌 {currentRangeLabel || "Date range notes"}
        </label>
        <div className="lined-paper h-20">
          <textarea 
            className="notes-textarea"
            placeholder={currentRangeLabel ? "Notes for this date range..." : "Select a date range to enable notes..."}
            value={currentRangeNote}
            onChange={(e) => onRangeNoteChange(e.target.value)}
            spellCheck="false"
            disabled={!currentRangeLabel}
          />
        </div>
      </div>
      {!currentRangeLabel && (
        <p className="text-[9px] text-gray-400 italic mt-2">
        </p>
      )}
    </div>
  );
}
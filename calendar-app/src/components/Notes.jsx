export default function Notes() {
  return (
    <div className="notes">
      <p>Notes</p>

      {[1,2,3,4,5,6].map((i) => (
        <div key={i} className="note-line"></div>
      ))}
    </div>
  );
}

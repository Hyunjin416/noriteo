export default function Pagination({ page, total, onPage }) {
  const last = Math.ceil(total);
  if (last === 1) return null;
  return (
    <div className="flex gap-2 mt-4">
      {Array.from({ length: last }, (_, i) => i + 1).map(n => (
        <button key={n}
          className={`px-3 py-1 border rounded ${n === page ? "bg-blue-500 text-white" : ""}`}
          onClick={() => onPage(n)}>
          {n}
        </button>
      ))}
    </div>
  );
}

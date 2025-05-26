import Pagination from "./Pagination.jsx";

export default function DataTable({ columns, rows, actions, page, total, onPage }) {
  return (
    <>
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map(c => <th key={c.key} className="p-2 border">{c.label}</th>)}
            {actions && <th className="p-2 border">액션</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              {columns.map(c => <td key={c.key} className="p-2 border">{r[c.key]}</td>)}
              {actions && <td className="p-2 border">{actions(r)}</td>}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination page={page} total={total} onPage={onPage}/>
    </>
  );
}

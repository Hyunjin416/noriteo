// src/components/admin/adminpage/BoardList.jsx
import React, { useState, useEffect } from "react";
import axios from "@/auth/AxiosConfig";
import DataTable from "../common/DataTable";

export default function BoardList() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const per = 10;

  useEffect(() => {
    axios
      .get("/api/admin/boards", { withCredentials: true })
      .then(res => setRows(res.data))
      .catch(console.error);
  }, []);

  const actions = row => (
    <button
      className="px-2 py-1 bg-orange-500 text-white rounded"
      onClick={() =>
        axios
          .delete(`/api/admin/boards/${row.boardId}`, { withCredentials: true })
          .then(() => setRows(prev => prev.filter(r => r.boardId !== row.boardId)))
          .catch(console.error)
      }
    >
      삭제
    </button>
  );

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">게시글 관리</h1>
      <DataTable
        columns={[
          { key: "boardId", label: "ID" },
          { key: "title",   label: "제목" },
          { key: "boardType",label:"카테고리" },
          { key: "userName", label: "작성자" },
          { key: "views",    label: "조회" },
        ]}
        rows={rows.slice((page - 1) * per, page * per)}
        actions={actions}
        page={page}
        total={Math.ceil(rows.length / per)}
        onPage={setPage}
      />
    </>
  );
}
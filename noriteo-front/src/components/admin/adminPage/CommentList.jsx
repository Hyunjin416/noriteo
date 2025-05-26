// src/components/admin/adminpage/CommentList.jsx
import React, { useState, useEffect } from "react";
import axios from "@/auth/AxiosConfig";
import DataTable from "../common/DataTable";

export default function CommentList() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const per = 10;

  useEffect(() => {
    axios
      .get("/api/admin/comments", { withCredentials: true })
      .then(res => setRows(res.data))
      .catch(console.error);
  }, []);

  const actions = row => (
    <button
      className="px-2 py-1 bg-red-600 text-white rounded"
      onClick={() =>
        axios
          .delete(`/api/admin/comments/${row.boardCommentId}`, { withCredentials: true })
          .then(() => setRows(prev => prev.filter(r => r.boardCommentId !== row.boardCommentId)))
          .catch(console.error)
      }
    >
      삭제
    </button>
  );

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">댓글 관리</h1>
      <DataTable
        columns={[
          { key: "boardCommentId", label: "ID" },
          { key: "boardId",        label: "글 ID" },
          { key: "userName",       label: "작성자" },
          { key: "content",        label: "내용" },
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

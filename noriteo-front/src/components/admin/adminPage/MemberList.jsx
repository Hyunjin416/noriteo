// src/components/admin/adminpage/MemberList.jsx
import React, { useState, useEffect } from "react";
import axios from "@/auth/AxiosConfig";
import DataTable from "../common/DataTable";

export default function MemberList() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const per = 10;

  useEffect(() => {
    axios
      .get("/api/admin/users", { withCredentials: true })
      .then(res => setRows(res.data))
      .catch(console.error);
  }, []);

  const actions = row => (
    <button
      className="px-2 py-1 bg-red-500 text-white rounded"
      onClick={() =>
        axios
          .delete(`/api/admin/users/${row.userId}`, { withCredentials: true })
          .then(() => setRows(prev => prev.filter(r => r.userId !== row.userId)))
          .catch(console.error)
      }
    >
      삭제
    </button>
  );

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">회원 관리</h1>
      <DataTable
        columns={[
          { key: "userId",   label: "ID" },
          { key: "userEmail",label: "E-mail" },
          { key: "userName", label: "이름" },
          { key: "roleId",   label: "역할" },
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

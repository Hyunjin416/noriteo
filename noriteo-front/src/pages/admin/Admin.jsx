// src/pages/admin/Admin.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Container    from "@/layouts/container/Container.jsx";
import AdminLogin   from "@/components/admin/sign/AdminLogin.jsx";
import AdminPage    from "@/components/admin/adminpage/AdminPage.jsx";
import Dashboard    from "@/components/admin/adminpage/Dashboard.jsx";
import MemberList   from "@/components/admin/adminpage/MemberList.jsx";
import BoardList    from "@/components/admin/adminpage/BoardList.jsx";
import CommentList  from "@/components/admin/adminpage/CommentList.jsx";

const Admin = () => (
  <Routes>
    <Route element={<Container />}>
      {/* /admin 또는 /admin/login */}
      <Route index element={<AdminPage />} />

      <Route path="login" element={<AdminLogin />} />

      {/* AdminPage 탭 전체(접근 권한 미적용) */}
      <Route path="dashboard" element={<AdminPage />}>
        {/* /admin/dashboard, /admin/memberList 등 탭 직접 접근도 가능 */}
        <Route index element={<Dashboard />} />
        <Route path="memberList"  element={<MemberList />} />
        <Route path="boardList"   element={<BoardList />} />
        <Route path="commentList" element={<CommentList />} />
        {/* <Route path="productList" element={<ProductList />} /> */}
      </Route>
    </Route>
  </Routes>
);

export default Admin;

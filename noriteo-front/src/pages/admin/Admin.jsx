import { Routes, Route } from "react-router-dom";
import Container from "@/layouts/container/Container.jsx";
import AdminLogin from "@/components/admin/sign/AdminLogin.jsx";
// import SignUp from "@/components/member/sign/SignUp.jsx";
import BoardList from "@/components/admin/adminPage/BoardList.jsx";
import CommentList from "@/components/admin/adminPage/CommentList.jsx";
import MemberList from "@/components/admin/adminPage/MemberList.jsx";
import ProductList from "@/components/admin/adminPage/ProductList.jsx";

const Admin = () => {
  return (
    // <ChatProvider>
    <Routes>
      {/* 레이아웃 빼고싶으면 Container 바깥에 Route 쓰기 */}
      <Route element={<Container />}>
        <Route index element={<AdminLogin />} />
        {/* 기본 경로 /admin일 때 adminLogin 렌더링 */}
        <Route path="login" element={<AdminLogin />} />
        {/* <Route path="signUp" element={<SignUp />} /> */}
        <Route path="boardList" element={<BoardList />} />
        <Route path="commentList" element={<CommentList />} />
        <Route path="memberList" element={<MemberList />} />
        <Route path="productList" element={<ProductList />} />
      </Route>
    </Routes>
    // </ChatProvider>
  );
};

export default Admin;

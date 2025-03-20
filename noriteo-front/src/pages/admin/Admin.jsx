import { Routes, Route } from "react-router-dom";
import Container from "../../layouts/container/Container.jsx";
// import Login from "../../components/member/sign/Login.jsx";
// import SignUp from "../../components/member/sign/SignUp.jsx";
const Admin = () => {
  return (
    // <ChatProvider>
    <Routes>
      {/* 레이아웃 빼고싶으면 Container 바깥에 Route 쓰기 */}
      <Route element={<Container />}>
        {/* <Route index element={<Login />} /> */}
        {/* 기본 경로 /member일 때 Login 렌더링 */}
        {/* <Route path="login" element={<Login />} /> */}
        {/* <Route path="signUp" element={<SignUp />} /> */}
      </Route>
    </Routes>
    // </ChatProvider>
  );
};

export default Admin;

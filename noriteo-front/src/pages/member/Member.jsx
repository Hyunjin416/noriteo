import { Routes, Route } from "react-router-dom";
import Container from "@/layouts/container/Container.jsx";
import Login from "@/components/member/sign/Login.jsx";
import SignUp from "@/components/member/sign/SignUp.jsx";
import KakaoCallback from "@/components/member/sign/KakaoCallback.jsx";
import BoardList from "@/components/member/myPage/BoardList.jsx";
import CommentList from "@/components/member/myPage/CommentList.jsx";
import ProductList from "@/components/member/myPage/ProductList.jsx";
import UpdateUser from "@/components/member/myPage/UpdateUser.jsx";

const Member = () => {
  return (
    // <ChatProvider>
    <Routes>
      {/* 레이아웃 빼고싶으면 Container 바깥에 Route 쓰기 */}
      <Route element={<Container />}>
        {/* 기본 경로 /member일 때 Login 렌더링 */}
        <Route index element={<Login />} />

        <Route path="login" element={<Login />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="kakao-callback" element={<KakaoCallback />} />

        <Route path="boardList" element={<BoardList />} />
        <Route path="commentList" element={<CommentList />} />
        <Route path="productList" element={<ProductList />} />
        <Route path="updateUser" element={<UpdateUser />} />
      </Route>
    </Routes>
    // </ChatProvider>
  );
};

export default Member;

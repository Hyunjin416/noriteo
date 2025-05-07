import { Routes, Route } from "react-router-dom";
import Container from "@/layouts/container/Container.jsx";
import BoardWrite from "@/components/board/BoardWrite.jsx";
import BoardDetail from "@/components/board/BoardDetail.jsx";
import BoardUpdate from "@/components/board/BoardUpdate.jsx";
import BoardPage from "@/components/board/BoardPage.jsx";
const Member = () => {
  return (
    // <ChatProvider>
    <Routes>
      {/* 레이아웃 빼고싶으면 Container 바깥에 Route 쓰기 */}
      <Route element={<Container />}>
        {/* 기본 경로 /board일 때 BoardPage 렌더링 */}
        <Route index element={<BoardPage />} />

        {/* <Route path="login" element={<Login />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="kakao-callback" element={<KakaoCallback />} /> */}

        {/* <Route path="list" element={<BoardPage />} /> */}
        <Route path="write" element={<BoardWrite />} />
        <Route path="detail/:boardId" element={<BoardDetail />} />
        <Route path="update/:boardId" element={<BoardUpdate />} />
      </Route>
    </Routes>
    // </ChatProvider>
  );
};

export default Member;

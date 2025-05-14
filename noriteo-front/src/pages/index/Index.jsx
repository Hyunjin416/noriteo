import { Routes, Route } from "react-router-dom";
// import HomePage from "@/components/index/HomePage.jsx";
import HomePage from "@/components/index/HomePage.jsx";
import Container from "@/layouts/container/Container.jsx";
//import BoardMain from "../../components/index/BoardMain.jsx";
import BoardPage from "@/components/board/BoardPage.jsx";
// import BoardDetail from "../../components/member/board/BoardDetail.jsx";q
import BoardWrite from "@/components/board/BoardWrite.jsx";
import BoardDetail from "@/components/board/BoardDetail";


const Index = () => {
  return (
    <Routes>
      {/* 공통 레이아웃 Container 적용 (header, footer) */}
      <Route element={<Container />}>
        {/* Home */}
        <Route index element={<HomePage />} />

        {/* 게시판 메인(목록) */}
        <Route path="boardpage" element={<BoardPage />} />

        {/* 새 글 작성 */}
        <Route path="boardwrite" element={<BoardWrite />} />

        {/* 글 수정 (BoardWrite 재사용) */}
        <Route path="boardwrite/:boardId" element={<BoardWrite />} />

        {/* 게시글 상세보기 */}
        <Route path="boarddetail/:boardId" element={<BoardDetail />} />
      </Route>
    </Routes>
  );
};

export default Index;

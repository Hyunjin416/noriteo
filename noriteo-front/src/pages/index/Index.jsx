import { Routes, Route } from "react-router-dom";
// import HomePage from "@/components/index/HomePage.jsx";
import HomePage from "@/components/index/HomePage.jsx";
import Container from "@/layouts/container/Container.jsx";
//import BoardMain from "../../components/index/BoardMain.jsx";
import BoardPage from "@/components/board/BoardPage.jsx";
// import BoardDetail from "../../components/member/board/BoardDetail.jsx";q
import BoardWrite from "@/components/board/BoardWrite.jsx";

const Index = () => {
  return (
    // <ChatProvider>
    <Routes>
      {/* 레이아웃 빼고싶으면 Container 바깥에 Route 쓰기 */}
      {/* <Route path="/" element={<HomePage />} /> */}

      {/* 공통 레이아웃 Container 적용 (header, footer) */}
      <Route element={<Container />}>
        {/* 기본 경로 / 에서 HomePage 보여주기 */}
        <Route index element={<HomePage />} />

        {/* /BoardPage 경로에서 BoardPage 보여주기 */}
        <Route path="boardpage" element={<BoardPage />} />
        <Route path="boardWrite" element={<BoardWrite />} />

        {/* <Route path="BoardDetail" element={<BoardDetail />} /> */}
      </Route>
    </Routes>
    // </ChatProvider>
  );
};

export default Index;

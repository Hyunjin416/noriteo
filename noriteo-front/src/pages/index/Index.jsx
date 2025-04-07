import { Routes, Route } from "react-router-dom";
import HomePage from "@/components/index/HomePage.jsx";
import IndexPage from "@/components/index/IndexPage.jsx";
import Container from "../../layouts/container/Container.jsx";
import BoardMain from "../../components/index/BoardMain.jsx";
import PostBoardPage from "../../components/PostBoard/PostBoardPage.jsx";

const Index = () => {
  return (
    // <ChatProvider>
    <Routes>
      {/* 레이아웃 빼고싶으면 Container 바깥에 Route 쓰기 */}
      {/* <Route path="/" element={<HomePage />} /> */}

      {/* 공통 레이아웃 Container 적용 (header, footer) */}
      <Route element={<Container />}>

        {/* 기본 경로 / 에서 IndexPage 보여주기 */}
        <Route index element={<IndexPage />} />

        {/* /PostBoard 경로에서 PostBoardPage 보여주기 */}
        <Route path="PostBoard" element={<PostBoardPage />} /> 

        {/* HomePage, BoardMain 안 쓰기 때문에 연결 끊기
            /index 경로에서 IndexPage 보여주기   
        <Route path="index" element={<IndexPage />} /> 

            /index → BoardMain 
        <Route path="board" element={<BoardMain />} /> */}


      </Route>
    </Routes>
    // </ChatProvider>
  );
};

export default Index;
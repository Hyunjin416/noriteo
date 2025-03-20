import { Routes, Route } from "react-router-dom";
import HomePage from "@/components/index/HomePage.jsx";
import IndexPage from "@/components/index/IndexPage.jsx";
import Container from "../../layouts/container/Container.jsx";
const Index = () => {
  return (
    // <ChatProvider>
    <Routes>
      {/* 레이아웃 빼고싶으면 Container 바깥에 Route 쓰기 */}
      <Route path="/" element={<HomePage />} />
      <Route element={<Container />}>
        <Route path="/index" element={<IndexPage />} />
      </Route>
    </Routes>
    // </ChatProvider>
  );
};

export default Index;

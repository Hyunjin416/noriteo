import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/index/Index.jsx";
import Member from "./pages/member/Member.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Board from "./pages/board/Board.jsx";
//import PostPage from "./pages/PostPage/PostPage.jsx";
import KakaoCallback from "@/components/member/sign/KakaoCallback.jsx";
import NaverCallback from "@/components/member/sign/NaverCallback.jsx";

{
  /* <script
  src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${
    import.meta.env.REACT_APP_KAKAO_MAP_API_KEY
  }`}
></script>; */
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="kakao-callback" element={<KakaoCallback />} />
        <Route path="naver-callback" element={<NaverCallback />} />

        <Route path="/admin/*" element={<Admin />} />
        <Route path="/board/*" element={<Board />} />
        <Route path="/*" element={<Index />} />
        <Route path="/member/*" element={<Member />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

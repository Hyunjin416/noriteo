import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/index/Index.jsx";
import Member from "./pages/member/Member.jsx";
import Admin from "./pages/admin/Admin.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Index />} />
        <Route path="/member/*" element={<Member />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

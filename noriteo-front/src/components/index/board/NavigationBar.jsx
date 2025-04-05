// 다른 게시판으로 이동 가능한 네비게이션 바
// src/components/board/NavigationBar.jsx

import React from "react";
import "../../../components_css/index/board/NavigationBar.css";
import { useNavigate } from "react-router-dom"; // 1) useNavigate로 이동




export default function NavigationBar() {
    const navigate = useNavigate(); // 1) useNavigate 사용 시 주석 해제

    return (
        <nav className="navContainer">
      {/* 예시: useNavigate 사용 */}
      <button onClick={() => navigate("/PostBoard")}>자유게시판</button>
      <button onClick={() => navigate("/PostBoard")}>취미게시판</button>
      <button onClick={() => navigate("/PostBoard")}>놀거리게시판</button>
      <button onClick={() => navigate("/PostBoard")}>맛집게시판</button>
      <button onClick={() => navigate("/PostBoard")}>중고거래게시판</button>
        </nav>
    );
}
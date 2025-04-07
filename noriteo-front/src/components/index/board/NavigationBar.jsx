import React from "react";
import "../../../components_css/index/board/NavigationBar.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 URL의 쿼리 파라미터 category 읽기
  const queryParams = new URLSearchParams(location.search);
  const currentCategory = queryParams.get("category");

  // 카테고리 목록
  const categories = [
    "공지사항",
    "자유게시판",
    "취미게시판",
    "놀거리게시판",
    "맛집게시판",
    "거래게시판",
  ];

  return (
    <nav className="navContainer">
      {categories.map((category) => (
        <button
          key={category}
          className={currentCategory === category ? "active" : ""}
          onClick={() => navigate(`/PostBoard?category=${category}`)}
        >
          {category}
        </button>
      ))}
    </nav>
  );
}

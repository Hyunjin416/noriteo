import React from "react";
import "../../../../components_css/NevigationBarCSS/NevigationMenu.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavigationMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const currentBoardType = queryParams.get("board_type"); // ✅ 변경됨

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
          className={currentBoardType === category ? "active" : ""}
          onClick={() =>
            navigate(`/BoardList?board_type=${encodeURIComponent(category)}`)
          }
        >
          {category}
        </button>
      ))}
    </nav>
  );
}

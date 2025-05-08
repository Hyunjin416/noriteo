/*import React from "react";
import "@/components_css/index/board/NevigationBar/NevigationMenu.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavigationMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const currentBoardType = queryParams.get("board_type");

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
            navigate(`/boardList?board_type=${encodeURIComponent(category)}`)
          }
        >
          {category}
        </button>
      ))}
    </nav>
  );
}
*/

import React from "react";
import "@/components_css/index/board/NevigationBar/NevigationMenu.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavigationMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const currentBoardType = queryParams.get("board_type");

  // const categories = [
  //   { label: "공지사항", value: "notice" },
  //   { label: "자유게시판", value: "free" },
  //   { label: "취미게시판", value: "hobby" },
  //   { label: "놀거리게시판", value: "play" },
  //   { label: "맛집게시판", value: "food" },
  //   { label: "거래게시판", value: "sell" }, /*거래게시판 연결은 product 테이블에서 데이터 가져오도록 수정할 예정*/
  // ];
  // const categories = [
  //   { label: "공지사항", value: "공지사항" },
  //   { label: "자유게시판", value: "자유게시판" },
  //   { label: "취미게시판", value: "취미게시판" },
  //   { label: "놀거리게시판", value: "놀거리게시판" },
  //   { label: "맛집게시판", value: "맛집게시판" },
  //   { label: "거래게시판", value: "거래게시판" },
  // ];
  const categories = [
    { label: "공지사항", value: "notice" },
    { label: "자유게시판", value: "free" },
    { label: "취미게시판", value: "hobby" },
    { label: "놀거리게시판", value: "play" },
    { label: "맛집게시판", value: "food" },
    // { label: "거래게시판", value: "sell" },
  ];

  return (
    <nav className="navContainer">
      <button
        className={!currentBoardType ? "active" : ""}
        onClick={() => navigate("/boardPage")}
      >
        전체
      </button>

      {categories.map(({ label, value }) => (
        <button
          key={value}
          className={currentBoardType === value ? "active" : ""}
          onClick={() =>
            navigate(`/boardPage?board_type=${encodeURIComponent(value)}`)
          }
        >
          {label}
        </button>
      ))}
    </nav>
  );
}

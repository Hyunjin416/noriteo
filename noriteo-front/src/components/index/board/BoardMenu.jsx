import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../components_css/index/board/BoardMenu.css";

export default function BoardMenu() {
  const navigate = useNavigate();

  // 전체 글 보기
  const handleAllPosts = () => {
    navigate("/PostBoard"); // 쿼리 없이 이동하면 전체 게시글 보기
  };

  // 글쓰기 페이지 이동
  const handleWritePost = () => {
    navigate("/board/write");
  };

  // 게시판 카테고리 목록
  const categories = [
    "자유게시판",
    "취미게시판",
    "놀거리게시판",
    "맛집게시판",
    "거래게시판",
  ];

  // 특정 카테고리로 이동
  const handleCategory = (categoryName) => {
    navigate(`/PostBoard?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="boardMenuContainer">
      <h4 className="boardMenuTitle">게시판 메뉴</h4>

      <div className="boardMenuSection">
        <div className="boardMenuCategory" onClick={handleAllPosts}>
          전체 게시판
        </div>
        <button onClick={handleAllPosts}>- 전체 글보기</button>
        <button onClick={handleWritePost}>- 글쓰기</button>
      </div>

      {categories.map((category) => (
        <div className="boardMenuSection" key={category}>
          <div
            className="boardMenuCategory"
            onClick={() => handleCategory(category)}
          >
            {category}
          </div>
          <button onClick={() => handleCategory(category)}>
            - {category.replace("게시판", "")} 글보기
          </button>
        </div>
      ))}
    </div>
  );
}

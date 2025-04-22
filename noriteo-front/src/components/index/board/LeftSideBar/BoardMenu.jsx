/*import React from "react";
import { useNavigate } from "react-router-dom";
import "@/components_css/index/board/LeftSideBar/BoardMenu.css";

export default function BoardMenu() {
  const navigate = useNavigate();

  // 전체 글 보기
  const handleAllPosts = () => {
    navigate("/boardPage"); // 쿼리 없이 이동하면 전체 게시글 보기
  };

  // 글쓰기 페이지 이동
  const handleWritePost = () => {
    navigate("/boardWrite");
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
    navigate(`/BoardList?board_type=${encodeURIComponent(categoryName)}`);
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
*/

import React from "react";
import { useNavigate } from "react-router-dom";
import "@/components_css/index/board/LeftSideBar/BoardMenu.css";

export default function BoardMenu() {
  const navigate = useNavigate();

  const handleAllPosts = () => {
    navigate("/boardPage");
  };

  const handleWritePost = () => {
    navigate("/boardWrite");
  };

  const categories = [
    { label: "공지사항", value:"notice" },
    { label: "자유게시판", value: "free" },
    { label: "취미게시판", value: "hobby" },
    { label: "놀거리게시판", value: "play" },
    { label: "맛집게시판", value: "food" },
    { label: "거래게시판", value: "sell" }, /*거래게시판 연결은 product 테이블에서 데이터 가져오도록 수정할 예정*/
  ];

  const handleCategory = (value) => {
    navigate(`/boardPage?board_type=${encodeURIComponent(value)}`);
  };

  return (
    <div className="boardMenuContainer">
      <h4 className="boardMenuTitle">📁게시판 메뉴</h4>

      <div className="boardMenuSection">
        <div className="boardMenuCategory" onClick={handleAllPosts}>
          전체 게시판
        </div>
        <button onClick={handleAllPosts}>- 📄전체 글보기</button>
        <button onClick={handleWritePost}>- ✏️글쓰기</button>
      </div>

      {categories.map(({ label, value }) => (
        <div className="boardMenuSection" key={value}>
          <div
            className="boardMenuCategory"
            onClick={() => handleCategory(value)}
          >
            {label}
          </div>
          <button onClick={() => handleCategory(value)}>
            - {label.replace("게시판", "")} 글보기
          </button>
        </div>
      ))}
    </div>
  );
}


// src/components/board/BoardMenu.jsx
import React from "react";
import "./css/BoardMenu.css";

/* 
실제 라우팅이 필요할 때

1. useNavigate import 주석 해제
2. handleAllPosts, handleWritePost, 등등 주석 해제
3. onClick 부분에서 handleXXXMock 대신 실제 함수로 연결
*/

/*
임시 데이터/예시:
- 실제로는 API 호출로 게시판 목록을 받아오거나, 라우팅 시 URL 파라미터를 이용할 수도 있음.
*/

// 라우팅 시 사용할 수 있는 예시 코드 (주석)
// import { useNavigate } from "react-router-dom";

export default function BoardMenu() {
  // ------------------------------
  // 라우팅이 필요할 때 주석 해제:
  /*
  const navigate = useNavigate();

  const handleAllPosts = () => {
    navigate("/board/all");
  };

  const handleWritePost = () => {
    navigate("/board/write");
  };

  const handleCategoryClick = (boardName) => {
    // 예시: boardName에 따라 url 세분화
    // boardName "자유" => "/board/free"
    // boardName "취미" => "/board/hobby"
    // ...
    navigate(`/board/${boardName}`);
  };

  const handleFreeBoard = () => {
    navigate("/board/free");
  };

  const handleHobbyBoard = () => {
    navigate("/board/hobby");
  };

  const handlePlayBoard = () => {
    navigate("/board/play");
  };

  const handleFoodBoard = () => {
    navigate("/board/food");
  };

  const handleTradeBoard = () => {
    navigate("/board/trade");
  };
  */
  // ------------------------------

  // 현재는 임시데이터만 사용하는 로직
  const handleAllPostsMock = () => {
    alert("전체 글보기 이동");
  };

  const handleWritePostMock = () => {
    alert("글쓰기 페이지 이동");
  };

  const handleCategoryClickMock = (name) => {
    alert(`${name} 게시판 메인 페이지로 이동`);
  };

  const handleFreeBoardMock = () => {
    alert("자유 게시판 글보기 이동");
  };

  const handleHobbyBoardMock = () => {
    alert("취미 게시판 글보기 이동");
  };

  const handlePlayBoardMock = () => {
    alert("놀거리 게시판 글보기 이동");
  };

  const handleFoodBoardMock = () => {
    alert("맛집 게시판 글보기 이동");
  };

  const handleTradeBoardMock = () => {
    alert("중고거래 게시판 글보기 이동");
  };

  return (
    <div className="boardMenuContainer">
      <h4 className="boardMenuTitle">게시판 메뉴</h4>

      <div className="boardMenuSection">
        <div
          className="boardMenuCategory"
          onClick={() => handleCategoryClickMock("전체")}
        >
          전체 게시판
        </div>
        <button onClick={handleAllPostsMock}>- 전체 글보기</button>
        <button onClick={handleWritePostMock}>- 글쓰기</button>
      </div>

      <div className="boardMenuSection">
        <div
          className="boardMenuCategory"
          onClick={() => handleCategoryClickMock("자유")}
        >
          자유 게시판
        </div>
        <button onClick={handleFreeBoardMock}>- 자유 글보기</button>
      </div>

      <div className="boardMenuSection">
        <div
          className="boardMenuCategory"
          onClick={() => handleCategoryClickMock("취미")}
        >
          취미 게시판
        </div>
        <button onClick={handleHobbyBoardMock}>- 취미 글보기</button>
      </div>

      <div className="boardMenuSection">
        <div
          className="boardMenuCategory"
          onClick={() => handleCategoryClickMock("놀거리")}
        >
          놀거리 게시판
        </div>
        <button onClick={handlePlayBoardMock}>- 놀거리 글보기</button>
      </div>

      <div className="boardMenuSection">
        <div
          className="boardMenuCategory"
          onClick={() => handleCategoryClickMock("맛집")}
        >
          맛집 게시판
        </div>
        <button onClick={handleFoodBoardMock}>- 맛집 글보기</button>
      </div>

      <div className="boardMenuSection">
        <div
          className="boardMenuCategory"
          onClick={() => handleCategoryClickMock("중고거래")}
        >
          중고거래 게시판
        </div>
        <button onClick={handleTradeBoardMock}>- 중고거래 글보기</button>
      </div>
    </div>
  );
}

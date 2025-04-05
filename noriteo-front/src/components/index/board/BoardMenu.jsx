// src/components/board/BoardMenu.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../components_css/index/board/BoardMenu.css";

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

  const navigate = useNavigate();

  const handleAllPosts = () => {
    navigate("/PostBoard");
  };

  const handleWritePost = () => {
    navigate("/board/write");
  };

{/*  
  const handleCategoryClick = (boardName) => {
    // 예시: boardName에 따라 url 세분화
    // boardName "자유" => "/board/free"
    // boardName "취미" => "/board/hobby"
    // ...
    navigate(`/board/${boardName}`);
  };
*/}

  const handleFreeBoard = () => {
    navigate("/PostBoard");
  };

  const handleHobbyBoard = () => {
    navigate("/PostBoard");
  };

  const handlePlayBoard = () => {
    navigate("/PostBoard");
  };

  const handleFoodBoard = () => {
    navigate("/PostBoard");
  };

  const handleTradeBoard = () => {
    navigate("/PostBoard");
  };






  return (
    <div className="boardMenuContainer">
      <h4 className="boardMenuTitle">게시판 메뉴</h4>

      <div className="boardMenuSection">
        <div
          className="boardMenuCategory"
          onClick={handleAllPosts}
        >
          전체 게시판
        </div>
        <button onClick={handleAllPosts}>- 전체 글보기</button>
        <button onClick={handleWritePost}>- 글쓰기</button>
      </div>

      <div className="boardMenuSection">
        <div
          className="boardMenuCategory"
          onClick={handleFreeBoard}
        >
          자유 게시판
        </div>
        <button onClick={handleFreeBoard}>- 자유 글보기</button>
      </div>

      <div className="boardMenuSection">
        <div
          className="boardMenuCategory"
          onClick={handleHobbyBoard}
        >
          취미 게시판
        </div>
        <button onClick={handleHobbyBoard}>- 취미 글보기</button>
      </div>

      <div className="boardMenuSection">
        <div
          className="boardMenuCategory"
          onClick={handlePlayBoard}
        >
          놀거리 게시판
        </div>
        <button onClick={handlePlayBoard}>- 놀거리 글보기</button>
      </div>

      <div className="boardMenuSection">
        <div
          className="boardMenuCategory"
          onClick={handleFoodBoard}
        >
          맛집 게시판
        </div>
        <button onClick={handleFoodBoard}>- 맛집 글보기</button>
      </div>

      <div className="boardMenuSection">
        <div
          className="boardMenuCategory"
          onClick={handleTradeBoard}
        >
          중고거래 게시판
        </div>
        <button onClick={handleTradeBoard}>- 중고거래 글보기</button>
      </div>
    </div>
  );
}

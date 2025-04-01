// 다른 게시판으로 이동 가능한 네비게이션 바
// src/components/board/NavigationBar.jsx

import React from "react";
import "./css/NavigationBar.css";
// import { useNavigate } from "react-router-dom"; // 1) useNavigate로 이동
// import { Link } from "react-router-dom";        // 2) Link 컴포넌트로 이동


export default function NavigationBar() {
  // const navigate = useNavigate(); // 1) useNavigate 사용 시 주석 해제

    return (
        <nav className="navContainer">
      {/* 아래는 alert()로 임시 처리 */}
      {/* 실제 이동 시, 원하는 방식으로 주석 해제하여 사용 */}

      {/* 예시: useNavigate 사용 */}
      {/* <button onClick={() => navigate("/board/free")}>자유게시판</button> */}
      {/* <button onClick={() => navigate("/board/hobby")}>취미게시판</button> */}
      {/* <button onClick={() => navigate("/board/play")}>놀거리게시판</button> */}
      {/* <button onClick={() => navigate("/board/food")}>맛집게시판</button> */}
      {/* <button onClick={() => navigate("/board/trade")}>중고거래게시판</button> */}

      {/* 예시: Link 컴포넌트 사용 */}
      {/* <Link to="/board/free" className="navButton">자유게시판</Link> */}
      {/* <Link to="/board/hobby" className="navButton">취미게시판</Link> */}
      {/* <Link to="/board/play" className="navButton">놀거리게시판</Link> */}
      {/* <Link to="/board/food" className="navButton">맛집게시판</Link> */}
      {/* <Link to="/board/trade" className="navButton">중고거래게시판</Link> */}

      {/* 현재는 alert()로 임시 동작 */}
            <button onClick={() => alert("자유게시판으로 이동")}>자유게시판</button>
            <button onClick={() => alert("취미게시판으로 이동")}>취미게시판</button>
            <button onClick={() => alert("놀거리게시판으로 이동")}>놀거리게시판</button>
            <button onClick={() => alert("맛집게시판으로 이동")}>맛집게시판</button>
            <button onClick={() => alert("중고거래게시판으로 이동")}>중고거래게시판</button>
        </nav>
    );
}
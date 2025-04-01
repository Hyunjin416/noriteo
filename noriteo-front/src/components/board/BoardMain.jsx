// src/components/board/BoardMain.jsx
import React from "react";
import "./BoardMain.css";
import NavigationBar from "./NavigationBar";
import LeftSidebar from "./fragment/LeftSidebar";
import CenterContent from "./fragment/CenterContent";
import RightSidebar from "./fragment/RightSidebar";

export default function BoardMain() {
  return (
    <div className="boardMainContainer">
      <NavigationBar /> {/* 헤더 밑에 네비게이션 바 위치 */}
      <div className="boardMainBody">
        <LeftSidebar /> {/* 왼쪽 사이드바 위치 */}
        <CenterContent /> {/* 중앙 콘텐츠 위치 */}
        <RightSidebar /> {/* 오른쪽 사이드바 위치 */}
      </div>
    </div>
  );
}

import React from "react";
import "@/components_css/board/BoardPage.css";
import NevigationMenu from "./board/NevigationBar/NevigationMenu";
import LeftSideSet from "./board/LeftSideBar/LeftSideSet";
import CenterSet from "./board/CenterBar/CenterSet";
import RightSideSet from "./board/RightSideBar/RightSideSet";

export default function HomePage() {
  return (
    <div className="boardMainContainer">
      <NevigationMenu /> {/* 헤더 밑에 네비게이션 바 위치 */}
      <div className="boardMainBody">
        <LeftSideSet /> {/* 왼쪽 사이드바 위치 */}
        <CenterSet /> {/* 중앙 콘텐츠 위치 */}
        <RightSideSet /> {/* 오른쪽 사이드바 위치 */}
      </div>
    </div>
  );
}

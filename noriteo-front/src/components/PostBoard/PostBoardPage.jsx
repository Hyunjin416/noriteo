import React from "react";
import "../../components_css/index/BoardMain.css"; // CSS 모듈 import
import NavigationBar from "../index/board/NavigationBar";
import LeftSidebar from "../index/fragment/LeftSidebar";
import RightSidebar from "../index/fragment/RightSidebar";
import PostList from "./PostList";  // PostList 컴포넌트 추가

export default function PostBoard() {
    return (
    <div className="boardMainContainer">
      <NavigationBar /> {/* 헤더 밑에 네비게이션 바 위치 */}
      <div className="boardMainBody">
        <LeftSidebar /> {/* 왼쪽 사이드바 위치 */}
        {/* 여기서 PostList 컴포넌트를 이용해 전체 글 목록을 출력 */}
        <div className="post-board-content">
            <PostList filterCategory={null} />
            {/* 만약 특정 카테고리만 보고 싶다면 filterCategory prop에 원하는 말머리 값을 전달 */}
        </div>
        <RightSidebar /> {/* 오른쪽 사이드바 위치 */}
      </div>
    </div>
    );
}
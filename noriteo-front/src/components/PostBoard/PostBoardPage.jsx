import React from "react";
import "../../components_css/index/BoardMain.css";
import NavigationBar from "../../components/index/board/NavigationBar";
import LeftSidebar from "../index/fragment/LeftSidebar";
import RightSidebar from "../index/fragment/RightSidebar";
import PostList from "./PostList";
import { useLocation } from "react-router-dom";

export default function PostBoardPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const sort = queryParams.get("sort");         // 예: views

  // 문자열 카테고리명 → board_id 숫자 매핑
  const categoryMap = {
    "공지사항": 1,
    "자유게시판": 2,
    "취미게시판": 3,
    "놀거리게시판": 4,
    "맛집게시판": 5,
    "거래게시판": 6,
  };

  const filterBoardId = categoryMap[category] ?? null;

  return (
    <div className="boardMainContainer">
      <NavigationBar />
      <div className="boardMainBody">
        <LeftSidebar />
        <div className="post-board-content">
          <PostList filterBoardId={filterBoardId} sortType={sort} />
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}
